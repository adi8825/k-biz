"use client";

import { motion } from "framer-motion";
import { POSITION_TRANSITION, EXIT_FADE, DIM_FADE, UNDIM_FADE, DIMMED_OPACITY } from "./transitions";

type CurveBox = { x: number; y: number; width: number; height: number };

/**
 * A timeline string. Strings are keyed by row index, so the rows that exist in
 * both layouts keep their element and simply travel to the new y; only the
 * surplus row actually enters or leaves, and it does so as a soft fade under
 * AnimatePresence rather than vanishing on commit.
 */
export default function CurveLine({ curve, dimmed = false }: { curve: CurveBox; dimmed?: boolean }) {
  return (
    <motion.div
      className="absolute left-0 top-0"
      style={{ width: curve.width, height: curve.height }}
      initial={{ opacity: 0 }}
      animate={{ x: curve.x, y: curve.y, opacity: dimmed ? DIMMED_OPACITY : 1 }}
      exit={{ opacity: 0, transition: EXIT_FADE }}
      transition={{ ...POSITION_TRANSITION, opacity: dimmed ? DIM_FADE : UNDIM_FADE }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/mainscreen/curve.svg" alt="" className="size-full" />
    </motion.div>
  );
}
