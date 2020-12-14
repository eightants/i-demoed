import fs from "fs";
import path from "path";
import { drawBadge, generateBadgeFromImage } from "../../../functions/badges";
import { calculateX, calculateY } from "../../../functions/common";
import { BADGE_SIZE, PER_ROW } from "../../../functions/constants";

export default (req, res) => {
  const dirRelativeToPublicFolder = "badges";
  const dir = path.resolve("./public", dirRelativeToPublicFolder);
  const filenames = fs.readdirSync(dir);
  const images = Object.assign.apply(
    null,
    filenames.map((x) => ({ [x]: 0 }))
  );

  const events = req.query.events.split(",");

  const svgWidth = (BADGE_SIZE + 2) * (PER_ROW + 1);
  const svgHeight = (BADGE_SIZE + 2) * Math.ceil(events.length / PER_ROW);
  const svg =
    `<svg width="${svgWidth}" height="${svgHeight}"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">` +
    events
      .map((name, ind) =>
        images.hasOwnProperty(`${name}.png`)
          ? drawBadge(
              path.join("/", dirRelativeToPublicFolder, `${name}.png`),
              calculateX(ind, PER_ROW, BADGE_SIZE),
              calculateY(ind, PER_ROW, BADGE_SIZE),
              BADGE_SIZE
            )
          : generateBadgeFromImage(
              "https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/challenge_thumbnails/001/302/856/datas/medium.jpg",
              calculateX(ind, PER_ROW, BADGE_SIZE),
              calculateY(ind, PER_ROW, BADGE_SIZE),
              BADGE_SIZE
            )
      )
      .join("") +
    `</svg>`;
  res.setHeader("content-type", "image/svg+xml");
  res.status(200).send(svg);
};
