"use client";

import "@/styles/global.css";
import { OverlayProvider } from "overlay-kit";
import { ThemeProvider } from "@/theme";
import { themeScript } from "@/theme/themeScript";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head></head>
      <body>
        <ThemeProvider>
          <OverlayProvider>{children}</OverlayProvider>
        </ThemeProvider>
        <script dangerouslySetInnerHTML={{ __html: `(${themeScript})()` }} />
      </body>
    </html>
  );
}
