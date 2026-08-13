import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Lexcode — Software studio of one";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = await readFile(join(process.cwd(), "assets/Archivo-ExtraBold.ttf"));

const BG = "#201E1D";
const FG = "#F3F2F2";
const ACCENT = "#EC3013";

export default function Image() {
  // Mark proportions — matches Mark.tsx at size=80
  const markSize = 80;
  const border = Math.max(2, Math.round(markSize * 0.059)); // 5
  const pad = Math.round(markSize * 0.176);                 // 14
  const barH = Math.max(2, Math.round(markSize * 0.088));   // 7
  const dotSize = Math.round(markSize * 0.265);             // 21

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Archivo",
        }}
      >
        {/* Logo lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: markSize,
              height: markSize,
              border: `${border}px solid ${FG}`,
              padding: pad,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexShrink: 0,
            }}
          >
            <div style={{ height: barH, width: "100%", background: FG }} />
            <div style={{ width: dotSize, height: dotSize, background: ACCENT }} />
          </div>
          <span
            style={{
              fontSize: 60,
              fontWeight: 800,
              color: FG,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Lexcode
          </span>
        </div>

        {/* Tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: FG,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Words in.
          </span>
          <span
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: ACCENT,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Software out.
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Archivo", data: font, weight: 800, style: "normal" }],
    }
  );
}
