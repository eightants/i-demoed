import { loadImage } from "canvas";
import fetch from "node-fetch";
import { BASE64_PNG_ENCODE_STRING } from "./constants";

export async function drawBadge(filename, ctx, x, y, badge_size) {
  const img = await loadImage(filename);
  const ratio = img.width / img.height;
  ctx.drawImage(
    img,
    x + (0.5 - ratio / 2) * badge_size,
    y,
    badge_size * ratio,
    badge_size
  );
}

function drawHexagon(ctx, x, y, badge_size, fill) {
  ctx.moveTo(x + badge_size * Math.cos(0), y + badge_size * Math.sin(0));
  ctx.beginPath();
  for (let side = 0; side < 7; side++) {
    ctx.lineTo(
      x + badge_size * Math.cos((side * 2 * Math.PI) / 6 - Math.PI / 2),
      y + badge_size * Math.sin((side * 2 * Math.PI) / 6 - Math.PI / 2)
    );
  }
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.closePath();
}

export async function generateBadgeFromImage(url, ctx, x, y, badge_size) {
  drawHexagon(
    ctx,
    x + badge_size / 2,
    y + badge_size / 2,
    badge_size / 2,
    "#333333"
  );
  const borderSize = Math.floor(badge_size / 20) * 2;
  const img = await loadImage(url);
  ctx.save();
  drawHexagon(
    ctx,
    x + badge_size / 2,
    y + badge_size / 2,
    badge_size / 2 - borderSize / 2,
    "#eeeeee"
  );
  ctx.clip();
  ctx.drawImage(
    img,
    x + borderSize / 2,
    y + borderSize / 2,
    badge_size - borderSize,
    badge_size - borderSize
  );
  ctx.restore();
}

export function drawSvgBadge(filename, x, y, badge_size) {
  return `<image href="${BASE64_PNG_ENCODE_STRING + filename}" xlink:href="${
    BASE64_PNG_ENCODE_STRING + filename
  }" height="${badge_size}" width="${badge_size}" x="${x}" y="${y}"/>`;
}

const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.buffer())
    .then((buf) => buf.toString("base64"));

export async function generateSvgBadgeFromImage(url, ind, x, y, badge_size) {
  const img = await toDataURL(url);
  return `<g transform="translate(${x},${y})"><g transform="scale(${
    badge_size / 300
  })"><svg id="image-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="300" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>
  <pattern id="image-bg-${ind}" x="20" y="20" height="300" width="300" patternUnits="userSpaceOnUse">
    <image width="260" height="260" href="${
      BASE64_PNG_ENCODE_STRING + img
    }" xlink:href="${BASE64_PNG_ENCODE_STRING + img}"></image>
 </pattern>
</defs>
<polygon class="hex" points="150,300 280,225 280,75 150,0 20,75 20,225" fill="#333333"></polygon>
<polygon class="hex" points="150,284 264,217 264,83 150,16 36,83 36,217" fill="url('#image-bg-${ind}')"></polygon>
</svg></g></g>`;
}

export const buildSvgWall = (
  svgWidth,
  svgHeight,
  generatedImages
) => `<svg width="${svgWidth}" height="${svgHeight}"
xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${generatedImages.join(
  ""
)}</svg>`;
