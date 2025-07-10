import React from "react";
import satori from "satori";
import path from "path";
import fs from "fs";


const fontPath = path.join(process.cwd(), "fonts", "gabarito.ttf");
const gabaritoFont = fs.readFileSync(fontPath);

function generateTextShadow(color) {
  const offsets = [
    [-2, -2], [-1.5, -1.5], [0, -2], [0, -1.5], [2, -2], [1.5, -1.5],
    [2, 0], [1.5, 0], [2, 2], [1.5, 1.5], [0, 2], [0, 1.5],
    [-2, 2], [-1.5, 1.5], [-2, 0], [-1.5, 0],
  ];

  return offsets.map(([dx, dy]) => `${dx}px ${dy}px 0px ${color}`).join(", ");
}

export async function generateBadgeSvg({ icon, label, backgroundColor = "#ffffff", borderColor = "#000000", labelColor = "#ffffff" }) {
  const formatHex = (hex) => (hex.startsWith("#") ? hex : `#${hex}`);

  const iconSize = 16;
  const iconPadding = 2;
  const iconTotalSize = icon ? iconSize + iconPadding * 2 : 0;
  
  const borderWidth = 2;
  const margin = 2;
  const padding = 3;
  const labelMargin = 6;

  const formattedBorderColor = formatHex(borderColor);
  const formattedBackgroundColor = formatHex(backgroundColor);
  const formattedLabelColor = formatHex(labelColor);
  const textShadowValue = generateTextShadow(formattedBorderColor);

  const svg = await satori(
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: `${margin}px`,
          boxSizing: "border-box",
        },
      },
      React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            padding: `${padding}px`,
            backgroundColor: formattedBackgroundColor,
            border: `${borderWidth}px solid ${formattedBorderColor}`,
            borderRadius: "6px",
            color: formattedLabelColor,
            fontWeight: 600,
            fontFamily: "Gabarito",
            fontSize: 14,
            textShadow: textShadowValue,
            height: "32px",
            boxSizing: "border-box",
          },
        },
        icon && React.createElement("img", {
          src: icon,
          style: {
            padding: iconPadding,
            height: iconTotalSize,
            width: iconTotalSize,
            backgroundColor: formatHex(borderColor),
            borderRadius: 5,
            objectFit: "contain",
            objectPosition: "center",
            userSelect: "none",
          },
        }),
        React.createElement("p", {
          style: {
            margin: `0px ${labelMargin}px`,
            lineHeight: `${iconTotalSize}`,
            userSelect: "none",
          },
        }, label)
      )
    ),
    {
      fonts: [
        {
          name: "Gabarito",
          data: gabaritoFont,
          weight: 600,
          style: "normal",
        },
      ],
    }
  );

  return svg;
}