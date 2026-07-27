import { ALL_PLATES, type Plate } from "./plates";
import { SCENES, SCENE_IDS } from "./scenes";

/**
 * Development-time integrity checks for the Opening lattice.
 *
 * A decorative plate was once dropped during transcription and went unnoticed
 * because the visual checks only covered portraits and text. These assertions
 * make that class of mistake loud instead of silent. They run once on mount in
 * development and produce no UI.
 */
export type CensusIssue = { kind: string; detail: string };

/** Static checks over the data alone — no DOM required. */
export function auditPlateData(): CensusIssue[] {
  const issues: CensusIssue[] = [];

  const seen = new Map<string, Plate>();
  for (const p of ALL_PLATES) {
    if (seen.has(p.id)) {
      issues.push({ kind: "duplicate-id", detail: `plate id "${p.id}" declared more than once` });
    }
    seen.set(p.id, p);
    if (!p.src && !p.border) {
      issues.push({ kind: "no-artwork", detail: `plate "${p.id}" has neither src nor border` });
    }
    if (!(p.w > 0 && p.h > 0)) {
      issues.push({ kind: "bad-size", detail: `plate "${p.id}" has non-positive dimensions` });
    }
  }

  // Two plates occupying the identical box is almost always an accidental
  // double-render rather than a deliberate overlap.
  const boxes = new Map<string, string>();
  for (const p of ALL_PLATES) {
    const key = `${p.x},${p.y},${p.w},${p.h}`;
    const prev = boxes.get(key);
    if (prev) {
      issues.push({ kind: "duplicate-box", detail: `plates "${prev}" and "${p.id}" share box ${key}` });
    }
    boxes.set(key, p.id);
  }

  // Every scene photo must name a real plate.
  for (const id of SCENE_IDS) {
    for (const photo of SCENES[id].photos) {
      if (!seen.has(photo.plate)) {
        issues.push({
          kind: "unknown-plate",
          detail: `scene ${id} photo "${photo.src}" references unknown plate "${photo.plate}"`,
        });
      }
    }
    const used = new Set<string>();
    for (const photo of SCENES[id].photos) {
      if (used.has(photo.plate)) {
        issues.push({
          kind: "double-fill",
          detail: `scene ${id} fills plate "${photo.plate}" more than once`,
        });
      }
      used.add(photo.plate);
    }
  }

  return issues;
}

/**
 * Confirms the rendered DOM contains exactly one element per plate, at the
 * declared box, in design pixels.
 *
 * ScaleStage's factor is derived from `root`'s own measured width rather than
 * read from its transform: the transform is applied a frame after mount, so
 * reading it separately from the rects reports every plate as misplaced by
 * whatever the scale happens to be.
 */
export function auditPlateDom(root: HTMLElement, designWidth: number): CensusIssue[] {
  const issues: CensusIssue[] = [];
  const origin = root.getBoundingClientRect();
  const scale = origin.width / designWidth;
  if (!(scale > 0) || !Number.isFinite(scale)) return issues; // not laid out yet

  for (const p of ALL_PLATES) {
    const nodes = root.querySelectorAll(`[data-plate="${p.id}"]`);
    if (nodes.length === 0) {
      issues.push({ kind: "missing-plate", detail: `plate "${p.id}" is not rendered` });
      continue;
    }
    if (nodes.length > 1) {
      issues.push({ kind: "duplicate-render", detail: `plate "${p.id}" rendered ${nodes.length} times` });
    }
    const r = (nodes[0] as HTMLElement).getBoundingClientRect();
    const x = (r.left - origin.left) / scale;
    const y = (r.top - origin.top) / scale;
    const w = r.width / scale;
    const h = r.height / scale;
    const off = (a: number, b: number) => Math.abs(a - b) > 0.75;
    if (off(x, p.x) || off(y, p.y) || off(w, p.w) || off(h, p.h)) {
      issues.push({
        kind: "wrong-box",
        detail: `plate "${p.id}" at ${x.toFixed(1)},${y.toFixed(1)} ${w.toFixed(1)}x${h.toFixed(1)} — expected ${p.x},${p.y} ${p.w}x${p.h}`,
      });
    }
  }
  return issues;
}

export function reportCensus(issues: CensusIssue[], label: string): void {
  if (issues.length === 0) return;
  // eslint-disable-next-line no-console
  console.error(
    `[Opening plate census] ${label}: ${issues.length} issue(s)\n` +
      issues.map((i) => `  • ${i.kind}: ${i.detail}`).join("\n"),
  );
}
