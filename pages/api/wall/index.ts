import path from "path";
import { drawBadge, generateBadgeFromImage } from "../../../functions/badges";
import {
  badgesFiles,
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { events, username, pr = MAX_PER_ROW },
  } = req;

  const per_row = Number(pr);
  const images = badgesFiles(DEVPOST_BADGES);
  const customImages = badgesFiles(ALT_BADGES);

  const devpostEvents = parseDevpostEvents(
    !username || Array.isArray(username)
      ? []
      : await getUsersHackathons(username)
  );
  const customEvents = parseCustomEvents(
    !events || Array.isArray(events) ? [] : events.split(",")
  );
  const badges = [...devpostEvents, ...customEvents];

  const svgWidth = (BADGE_SIZE + 2) * (per_row + 1);
  const svgHeight = (BADGE_SIZE + 2) * Math.ceil(badges.length / per_row);
  const svg =
    `<svg width="${svgWidth}" height="${svgHeight}"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">` +
    badges
      .map((elem, ind) =>
        images.hasOwnProperty(`${elem.filename}.png`) && !elem.alt
          ? drawBadge(
              path.join("/", DEVPOST_BADGES, `${elem.filename}.png`),
              calculateX(ind, per_row, BADGE_SIZE),
              calculateY(ind, per_row, BADGE_SIZE),
              BADGE_SIZE
            )
          : elem.alt && customImages.hasOwnProperty(`${elem.filename}.png`)
          ? drawBadge(
              path.join("/", ALT_BADGES, `${elem.filename}.png`),
              calculateX(ind, per_row, BADGE_SIZE),
              calculateY(ind, per_row, BADGE_SIZE),
              BADGE_SIZE
            )
          : generateBadgeFromImage(
              elem.badgeImage,
              ind,
              calculateX(ind, per_row, BADGE_SIZE),
              calculateY(ind, per_row, BADGE_SIZE),
              BADGE_SIZE
            )
      )
      .join("") +
    `</svg>`;
  res.setHeader("content-type", "image/svg+xml");
  res.status(200).send(svg);
};
