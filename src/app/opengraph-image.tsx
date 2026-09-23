import { ImageResponse } from "next/og";

export const alt = "Northstar Sales Lab — Make every sales conversation clearer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f6f4ee",
          color: "#112628",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px",
          width: "100%",
        }}
      >
        <div style={{ color: "#a43b2b", display: "flex", fontSize: 28, fontWeight: 700 }}>
          NORTHSTAR SALES LAB
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 920 }}>
          <div style={{ fontSize: 68, fontWeight: 400, letterSpacing: "-0.05em", lineHeight: 1.02 }}>
            Make every sales conversation clearer.
          </div>
          <div style={{ color: "#596768", fontSize: 26 }}>
            A practical portfolio demonstration for small B2B teams.
          </div>
        </div>
        <div style={{ color: "#1e4b47", display: "flex", fontSize: 22, fontWeight: 700 }}>
          PORTFOLIO DEMONSTRATION
        </div>
      </div>
    ),
    { ...size },
  );
}
