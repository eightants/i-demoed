import path from "path";
import fs from "fs";
import { createCanvas } from "canvas";
import {
  buildSvgWall,
  drawBadge,
  drawSvgBadge,
  generateBadgeFromImage,
  generateSvgBadgeFromImage,
} from "../../../functions/badges";
import {
  calculateX,
  calculateY,
  parseCustomEvents,
  parseDevpostEvents,
  trackServiceCall,
} from "../../../functions/common";
import {
  ALT_BADGES,
  BADGE_SIZE,
  DEVPOST_BADGES,
  DOMAIN,
  MAX_PER_ROW,
  WALL_MAX_AGE_SECONDS,
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
      type = "svg",
      placeholder = "",
    },
  } = req;

  const per_row = Number(pr);
  const projectLevel = Number(level);
  const badge_size =
    type == "png" ? Math.floor(Number(size) / 10) * 10 : BADGE_SIZE;
  const badge_limit = Number(limit);

  const pathToBadges = path.join(process.cwd(), "public");
  const images = badgesFiles(DEVPOST_BADGES);
  const customImages = badgesFiles(ALT_BADGES);

  const GA_TRACKING_ID = process.env.GA_TRACKING_ID || "";
  const REQ_REFERRAL = req.headers.referer || "";
  if (GA_TRACKING_ID != "") {
    await trackServiceCall(
      DOMAIN,
      "/api/wall",
      "Badge Wall",
      REQ_REFERRAL,
      GA_TRACKING_ID
    );
  }

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
  const svgHeight =
    badge_size +
    ((badge_size * 4) / 5) * Math.ceil(badges.length / per_row - 1);

  const canvas = createCanvas(svgWidth, svgHeight);
  const ctx = canvas.getContext("2d");

  const promises = [];
  for (let ind = 0; ind < badges.length; ind++) {
    const elem = badges[ind];
    if (type == "png") {
      Object.prototype.hasOwnProperty.call(images, `${elem.filename}.png`) &&
      !elem.alt
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
        : elem.alt &&
          Object.prototype.hasOwnProperty.call(
            customImages,
            `${elem.filename}.png`
          )
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
        : placeholder == "duck"
        ? promises.push(
            drawBadge(
              fs.readFileSync(
                path.join(pathToBadges, ALT_BADGES, "mlhduck.png")
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
    } else {
      Object.prototype.hasOwnProperty.call(images, `${elem.filename}.png`) &&
      !elem.alt
        ? promises.push(
            drawSvgBadge(
              fs.readFileSync(
                path.join(pathToBadges, DEVPOST_BADGES, `${elem.filename}.png`),
                "base64"
              ),
              calculateX(ind, per_row, badge_size),
              calculateY(ind, per_row, badge_size),
              badge_size
            )
          )
        : elem.alt &&
          Object.prototype.hasOwnProperty.call(
            customImages,
            `${elem.filename}.png`
          )
        ? promises.push(
            drawSvgBadge(
              fs.readFileSync(
                path.join(pathToBadges, ALT_BADGES, `${elem.filename}.png`),
                "base64"
              ),
              calculateX(ind, per_row, badge_size),
              calculateY(ind, per_row, badge_size),
              badge_size
            )
          )
        : placeholder == "duck"
        ? promises.push(
            drawSvgBadge(
              fs.readFileSync(
                path.join(pathToBadges, ALT_BADGES, "mlhduck.png"),
                "base64"
              ),
              calculateX(ind, per_row, badge_size),
              calculateY(ind, per_row, badge_size),
              badge_size
            )
          )
        : promises.push(
            generateSvgBadgeFromImage(
              elem.badgeImage,
              ind,
              calculateX(ind, per_row, badge_size),
              calculateY(ind, per_row, badge_size),
              badge_size
            )
          );
    }
  }
  const generatedImages = await Promise.all(promises);
  res.setHeader("cache-control", `max-age=${WALL_MAX_AGE_SECONDS}`);
  if (type == "png") {
    res.setHeader("content-type", "image/png");
    canvas.createPNGStream().pipe(res);
  } else {
    res.setHeader("content-type", "image/svg+xml");
    res.status(200).send(buildSvgWall(svgWidth, svgHeight, generatedImages));
  }
};
