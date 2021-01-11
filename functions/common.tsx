export function calculateX(ind, per_row, badge_size) {
  return (
    (Math.floor(ind / per_row) % 2) * (badge_size / 2) +
    (ind % per_row) * badge_size
  );
}

export function calculateY(ind, per_row, badge_size) {
  return 1 + Math.floor(ind / per_row) * (badge_size * 0.75 + 4);
}

export function parseDevpostEvents(events, level, limit) {
  return events
    .map((elem) => ({
      ...elem,
      filename: elem.id.split(".")[0],
      alt: false,
    }))
    .filter((elem) =>
      level > 1
        ? elem.userWonPrize
        : level > 0
        ? elem.userSubmittedProject
        : true
    )
    .slice(0, limit == -1 ? events.length : limit);
}

export function parseCustomEvents(events) {
  return events.map((elem) => ({
    filename: elem.replace("hdb_", ""),
    alt: elem.split("_")[0] == "hdb",
  }));
}

export function svg2base64(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export const trackServiceCall = async (
  doc_home,
  doc_path,
  doc_title,
  referral,
  tracking_id
) => {
  return await fetch(
    `http://www.google-analytics.com/collect?v=1&tid=${tracking_id}&cid=555&t=pageview&dh=${encodeURIComponent(
      doc_home
    )}&dp=${encodeURIComponent(doc_path)}&dt=${encodeURIComponent(doc_title)}${
      referral == "" ? "" : "&dr=" + encodeURIComponent(referral)
    }&ua=${encodeURIComponent("Mozilla/5.0")}&z=${Date.now()}`
  );
};
