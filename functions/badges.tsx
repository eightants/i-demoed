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

function drawHexagon(ctx, x, y, badge_size, fill) {
  ctx.moveTo(x + badge_size * Math.cos(0), y + badge_size * Math.sin(0));
  ctx.beginPath();
  for (var side = 0; side < 7; side++) {
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
