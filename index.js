import express from "express";
import { generateBadgeSvg } from "./generateBadgeSvg.js";


const app = express();

app.get("/api/badge", async (req, res) => {
  const { icon, label, backgroundColor, borderColor, labelColor } = req.query;

  if (!label) {
    return res.status(400).send("Missing \"label\" query param");
  }

  const svg = await generateBadgeSvg({
    icon,
    label,
    backgroundColor,
    borderColor,
    labelColor
  });

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});