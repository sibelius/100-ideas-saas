import { ImageResponse } from "next/og";
import { bricolageFonts } from "@/lib/brand-image";

// Lime "100" on indigo: the favicon and the Apple touch icon share this mark.
export async function iconImage(px: number, radius: number) {
  const fonts = await bricolageFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0c0a1f",
          borderRadius: radius,
          fontFamily: "Bricolage",
          fontWeight: 800,
          fontSize: px * 0.5,
          letterSpacing: -px * 0.04,
          color: "#c6f432",
        }}
      >
        100
      </div>
    ),
    { width: px, height: px, fonts },
  );
}
