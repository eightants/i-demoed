export function calculateX(ind, per_row, badge_size) {
  return (
    2 +
    (Math.floor(ind / per_row) % 2) * (badge_size / 2 + 1) +
    (ind % per_row) * (badge_size + 2)
  );
}

export function calculateY(ind, per_row, badge_size) {
  return 2 + Math.floor(ind / per_row) * (badge_size * 0.75 + 2);
}
