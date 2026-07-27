import OpeningFlow from "@/components/Opening/OpeningFlow";

/**
 * The connected Opening sequence, beginning on the attract screen.
 *
 * The isolated development routes `/opening0` and `/opening1` are kept as they
 * are — this route composes those same components rather than replacing them.
 */
export default function OpeningPage() {
  return <OpeningFlow />;
}
