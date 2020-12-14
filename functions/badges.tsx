import { loadImage } from "canvas";

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

export function drawSvgBadge(filename, x, y, badge_size) {
  return `<image href="${filename}" height="${badge_size}" width="${badge_size}" x="${x}" y="${y}"/>`;
}

function drawHexagon(ctx, x, y, badge_size) {
  ctx.moveTo(x + badge_size * Math.cos(0), y + badge_size * Math.sin(0));
  ctx.beginPath();
  for (var side = 0; side < 7; side++) {
    ctx.lineTo(
      x + badge_size * Math.cos((side * 2 * Math.PI) / 6 - Math.PI / 2),
      y + badge_size * Math.sin((side * 2 * Math.PI) / 6 - Math.PI / 2)
    );
  }
}

export async function generateBadgeFromImage(url, ctx, x, y, badge_size) {
  drawHexagon(ctx, x + badge_size / 2, y + badge_size / 2, badge_size / 2);
  ctx.fillStyle = "#333333";
  ctx.fill();
  ctx.closePath();
  const img = await loadImage(url);
  ctx.save();

  //define the polygon bg image
  drawHexagon(ctx, x + badge_size / 2, y + badge_size / 2, badge_size / 2 - 5);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, x + 5, y + 5, badge_size - 10, badge_size - 10);
  ctx.restore();
}

export function generateSvgBadgeFromImage(url, ind, x, y, badge_size) {
  return `<g transform="translate(${x},${y})"><g transform="scale(${
    badge_size / 300
  })"><svg id="image-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="300" preserveAspectRatio="true" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
     <pattern id="image-bg-${ind}" x="0" y="0" height="300" width="300" patternUnits="userSpaceOnUse">
       <image width="300" height="300" xlink:href="${url}"></image>
    </pattern>
  </defs>
  <polygon class="hex" points="150,300 280,225 280,75 150,0 20,75 20,225" fill="#1e3354"></polygon>
  <polygon class="hex" points="150,280 260,215 260,85 150,20 40,85 40,215" fill="url('#image-bg-${ind}')"></polygon>
</svg></g></g>`;
}
