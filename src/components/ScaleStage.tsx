"use client";

import { useLayoutEffect, useRef, useState } from "react";

type ScaleStageProps = {
  width: number;
  height: number;
  children: React.ReactNode;
  className?: string;
};

/**
 * Renders `children` at their exact design-pixel size, then uniformly scales
 * the whole thing to fit the available width. Keeps every hand-placed
 * coordinate inside `children` pixel-accurate at any viewport size.
 */
export default function ScaleStage({ width, height, children, className }: ScaleStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const next = entry.contentRect.width / width;
      setScale(next);
      /* Published so fixed-position chrome outside the stage — the Spotify
       * panel — can line itself up with scaled sidebar coordinates without
       * being mounted inside the stage and losing its state on navigation. */
      document.documentElement.style.setProperty("--stage-scale", String(next));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: height * scale, position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
