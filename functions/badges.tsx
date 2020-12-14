export function drawBadge(filename, x, y, badge_size) {
  return `<image href="${filename}" height="${badge_size}" width="${badge_size}" x="${x}" y="${y}"/>`;
}

export function generateBadgeFromImage(url, x, y, badge_size) {
  return `<g transform="translate(${x},${y})"><g transform="scale(${
    badge_size / 300
  })"><svg id="image-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="300" preserveAspectRatio="true" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
     <pattern id="image-bg" x="0" y="0" height="300" width="300" patternUnits="userSpaceOnUse">
       <image width="300" height="300" xlink:href="${url}"></image>
    </pattern>
  </defs>
  <polygon class="hex" points="150,300 280,225 280,75 150,0 20,75 20,225" fill="#1e3354"></polygon>
  <polygon class="hex" points="150,280 260,215 260,85 150,20 40,85 40,215" fill="url('#image-bg')"></polygon>
</svg></g></g>`;
}
