import localFont from "next/font/local";

export const satoshi = localFont({
  src: [
    { path: "../../public/fonts/Satoshi/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/Satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Satoshi/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

/** Used only by the opening0 wordmark, which Figma sets in Playfair Display
 * Italic. Applied via `className` so it needs no variable on <html>. */
export const playfairDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/PlayfairDisplay/PlayfairDisplay-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
});
