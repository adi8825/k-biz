import OpeningFlow from "@/components/Opening/OpeningFlow";

/**
 * The site's entry point is the Opening, not the Timeline.
 *
 * `OpeningFlow` already owns the whole journey — Opening0 through Opening4,
 * the handoff, and the Timeline it lazily mounts at the end — so the root
 * route only has to mount it. The flow keeps its own stage state, which is
 * why the URL stays `/` the whole way through: there is no second route and
 * nothing reloads between the Opening and the Timeline.
 *
 * History is wired inside the flow too (`MainScreen onHistory={replayOpening}`),
 * so replaying rewinds to Opening0 in place rather than navigating away.
 *
 * `/opening` still exists and still works; it composes the same component.
 */
export default function Home() {
  return <OpeningFlow />;
}
