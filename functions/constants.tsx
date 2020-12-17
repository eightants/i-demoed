export const MAX_PER_ROW = 5;
export const BADGE_SIZE = 100;
export const WALL_MAX_AGE_SECONDS = 600;

export const DEVPOST_BADGES = "badges/devpost";
export const ALT_BADGES = "badges/alt";

export const DOMAIN = "https://idemoed.vercel.app";
export const WALL_URL_ENDPOINT = "/api/wall?username=";
export const BASE64_PNG_ENCODE_STRING = "data:image/png;base64,";
export const FULL_SERVICE_URL =
  DOMAIN +
  WALL_URL_ENDPOINT +
  "<USERNAME>&limit=<LIMIT>&level=<LEVEL>&events=<EVENTS>&pr=<PR>&size=<SIZE>&type=<TYPE>";

export const HACKATHONS_ENDPOINT_RES = [
  {
    id: "tamuhack2019.devpost.com",
    title: "TAMUhack 2019",
    link:
      "https://tamuhack2019.devpost.com/?ref_content=default&ref_feature=challenge&ref_medium=portfolio",
    badgeImage:
      "https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/challenge_thumbnails/000/738/497/datas/large.png",
    userSubmittedProject: true,
    userWonPrize: false,
  },
];

export const PROJECTS_ENDPOINT_RES = [
  {
    title: "Full House",
    link: "https://devpost.com/software/fullhouse",
    numLikes: "7",
  },
];
