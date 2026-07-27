import type { Metadata } from "next";
import { satoshi } from "@/lib/fonts";
import SpotifyProvider from "@/components/Spotify/SpotifyProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "K-BIZ",
  description: "Interactive K-pop data visualization platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.variable}>
      {/* The provider wraps everything the router renders, so the Spotify
        * iframe is created once here and survives every route change and
        * every internal view change beneath it. */}
      <body>
        <SpotifyProvider>{children}</SpotifyProvider>
      </body>
    </html>
  );
}
