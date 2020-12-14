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
    query: { events, username, pr = MAX_PER_ROW, level = "1" },
  } = req;

  const per_row = Number(pr);
  const projectLevel = Number(level);

  const pathToBadges = path.join(process.cwd(), "public");
  const images = badgesFiles(DEVPOST_BADGES);
  const customImages = badgesFiles(ALT_BADGES);
  console.log(images, customImages);

  const devpostEvents = parseDevpostEvents(
    !username || Array.isArray(username)
      ? []
      : await getUsersHackathons(username),
    projectLevel
  );
  const customEvents = parseCustomEvents(
    !events || Array.isArray(events) ? [] : events.split(",")
  );
  const badges = [...devpostEvents, ...customEvents];

  const svgWidth = (BADGE_SIZE + 2) * (per_row + 1);
  const svgHeight = (BADGE_SIZE + 2) * Math.ceil(badges.length / per_row);

  const canvas = createCanvas(svgWidth, svgHeight);
  const ctx = canvas.getContext("2d");

  for (var ind = 0; ind < badges.length; ind++) {
    const elem = badges[ind];
    images.hasOwnProperty(`${elem.filename}.png`) && !elem.alt
      ? await drawBadge(
          fs.readFileSync(
            path.join(pathToBadges, DEVPOST_BADGES, `${elem.filename}.png`)
          ),
          ctx,
          calculateX(ind, per_row, BADGE_SIZE),
          calculateY(ind, per_row, BADGE_SIZE),
          BADGE_SIZE
        )
      : elem.alt && customImages.hasOwnProperty(`${elem.filename}.png`)
      ? await drawBadge(
          fs.readFileSync(
            path.join(pathToBadges, ALT_BADGES, `${elem.filename}.png`)
          ),
          ctx,
          calculateX(ind, per_row, BADGE_SIZE),
          calculateY(ind, per_row, BADGE_SIZE),
          BADGE_SIZE
        )
      : await generateBadgeFromImage(
          elem.badgeImage,
          ctx,
          calculateX(ind, per_row, BADGE_SIZE),
          calculateY(ind, per_row, BADGE_SIZE),
          BADGE_SIZE
        );
  }
  res.setHeader("content-type", "image/png");
  canvas.createPNGStream().pipe(res);
};
