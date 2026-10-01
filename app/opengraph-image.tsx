import { ImageResponse } from "next/og";
import { bricolageFonts } from "@/lib/brand-image";

export const alt = "100 SaaS ideas worth building";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = ["AI back office", "Dev tools", "Local services", "Health", "Compliance"];

export default async function Image() {
  const fonts = await bricolageFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "Bricolage",
          color: "#ffffff",
          backgroundColor: "#0c0a1f",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(198,244,50,0.28), transparent 45%), radial-gradient(circle at 0% 100%, #2c2372, transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>
            <span style={{ color: "#c6f432" }}>100</span>
            <span style={{ marginLeft: 10 }}>SaaS ideas</span>
          </div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#e4ff80", letterSpacing: 4 }}>
            001 → 100
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
            <div style={{ fontSize: 230, fontWeight: 800, lineHeight: 0.82, color: "#c6f432", letterSpacing: -12 }}>
              100
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 80,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: -3,
                paddingBottom: 4,
              }}
            >
              <span>SaaS ideas</span>
              <span>worth building</span>
            </div>
          </div>
          <div style={{ marginTop: 30, fontSize: 34, fontWeight: 600, color: "#bab5de" }}>
            Ten markets, ten ideas each, all buildable by a small team
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                borderRadius: 999,
                backgroundColor: "#ffffff",
                color: "#0c0a1f",
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: "#c6f432" }} />
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
