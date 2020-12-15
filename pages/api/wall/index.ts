import path from "path";
import fs from "fs";
import { createCanvas } from "canvas";
import { drawBadge, generateBadgeFromImage } from "../../../functions/badges";
import {
  calculateX,
  calculateY,
  parseCustomEvents,
  parseDevpostEvents,
} from "../../../functions/common";
import {
  ALT_BADGES,
  BADGE_SIZE,
  DEVPOST_BADGES,
  MAX_PER_ROW,
} from "../../../functions/constants";
import { NextApiRequest, NextApiResponse } from "next";
import { getUsersHackathons } from "../../../functions/devpost";

function badgesFiles(dirPath) {
  const dir = path.resolve("./public", dirPath);
  const filenames = fs.readdirSync(dir);
  return Object.assign({}, ...filenames.map((x) => ({ [x]: 0 })));
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {
      events,
      username,
      pr = MAX_PER_ROW,
      size = BADGE_SIZE,
      level = "1",
      limit = "50",
    },
  } = req;

  const per_row = Number(pr);
  const projectLevel = Number(level);
  const badge_size = Math.floor(Number(size) / 10) * 10;
  const badge_limit = Number(limit);

  const pathToBadges = path.join(process.cwd(), "public");
  const images = badgesFiles(DEVPOST_BADGES);
  const customImages = badgesFiles(ALT_BADGES);

  const devpostEvents = parseDevpostEvents(
    !username || Array.isArray(username)
      ? []
      : await getUsersHackathons(username),
    projectLevel,
    badge_limit
  );
  const customEvents = parseCustomEvents(
    !events || Array.isArray(events) ? [] : events.split(",")
  );
  const badges = [...devpostEvents, ...customEvents];

  const svgWidth = (badge_size + 2) * (per_row + 1);
  const svgHeight = (badge_size + 2) * Math.ceil(badges.length / per_row);

  const canvas = createCanvas(svgWidth, svgHeight);
  const ctx = canvas.getContext("2d");

  const promises = [];
  for (var ind = 0; ind < badges.length; ind++) {
    const elem = badges[ind];
    images.hasOwnProperty(`${elem.filename}.png`) && !elem.alt
      ? promises.push(
          drawBadge(
            fs.readFileSync(
              path.join(pathToBadges, DEVPOST_BADGES, `${elem.filename}.png`)
            ),
            ctx,
            calculateX(ind, per_row, badge_size),
            calculateY(ind, per_row, badge_size),
            badge_size
          )
        )
      : elem.alt && customImages.hasOwnProperty(`${elem.filename}.png`)
      ? promises.push(
          drawBadge(
            fs.readFileSync(
              path.join(pathToBadges, ALT_BADGES, `${elem.filename}.png`)
            ),
            ctx,
            calculateX(ind, per_row, badge_size),
            calculateY(ind, per_row, badge_size),
            badge_size
          )
        )
      : promises.push(
          generateBadgeFromImage(
            elem.badgeImage,
            ctx,
            calculateX(ind, per_row, badge_size),
            calculateY(ind, per_row, badge_size),
            badge_size
          )
        );
  }
  await Promise.all(promises);
  res.setHeader("content-type", "image/png");
  canvas.createPNGStream().pipe(res);
};
