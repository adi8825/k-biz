"use client";

import { useState } from "react";
import Opening1 from "@/components/Opening/Opening1";
import { SCENE_IDS, type OpeningScene } from "@/components/Opening/scenes";

export default function Opening1Page() {
  const [scene, setScene] = useState<OpeningScene>(1);

  return (
    <main className="min-h-screen bg-ink">
      <Opening1 scene={scene} />
      {/* TEMPORARY preview control — the real driver (scroll) is a later
       * iteration. Not part of the Opening design. */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2 rounded bg-black/80 p-2 font-mono text-[11px] text-white">
        <span className="px-1 py-1 text-yellow-400">TEMP</span>
        {SCENE_IDS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScene(s)}
            aria-label={`Show opening${s}`}
            aria-pressed={scene === s}
            className={`rounded px-3 py-1 ${scene === s ? "bg-white text-black" : "bg-white/20"}`}
          >
            opening{s}
          </button>
        ))}
      </div>
    </main>
  );
}
