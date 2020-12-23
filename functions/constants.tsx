export const MAX_PER_ROW = 5;
export const BADGE_SIZE = 80;
export const WALL_MAX_AGE_SECONDS = 600;

export const SITE_TITLE = "I Demoed: Hackathon Badge Showcase";
export const DEVPOST_BADGES = "badges/devpost";
export const ALT_BADGES = "badges/alt";

export const DOMAIN = "https://idemoed.vercel.app";
export const GITHUB_REPO = "https://github.com/eightants/i-demoed";
export const WALL_URL_ENDPOINT = "/api/wall?username=";
export const BASE64_PNG_ENCODE_STRING = "data:image/png;base64,";
export const FULL_SERVICE_URL =
  DOMAIN +
  WALL_URL_ENDPOINT +
  "<USERNAME>&limit=<LIMIT>&level=<LEVEL>&events=<EVENTS>&pr=<PR>&size=<SIZE>&type=<TYPE>&placeholder=<PLACEHOLDER>";

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

export const EVENT_METADATA = {
  name: "Event name",
  id:
    "Will be used as identifier and as image name (<id>.png). Must not already exist in /public/badges/alt",
  description: "Optional description of event",
  url: "Optional event link",
};

export const BADGE19_DEFAULTS = {
  badgeType: "MLH 2019",
  backgroundColor: "#eeeeee",
  logo: "/images/hexagons.svg",
  mlhColor: "#aaaaaa",
  borderColor: "#333333",
  textColor: "#333333",
};

export const BADGE_TYPE_DEFAULTS = {
  id: "badgeType",
  label: "Badge Style",
  options: ["MLH 2019", "MLH 2020"],
  inputType: "dropdown",
};

export const BADGE_BG_COLOR_DEFAULTS = {
  id: "backgroundColor",
  label: "Background Color",
  inputType: "input",
};

export const BADGE_MLH_COLOR_DEFAULTS = {
  id: "mlhColor",
  label: "MLH Text Color",
  inputType: "input",
};

export const BADGE_BORDER_COLOR_DEFAULTS = {
  id: "borderColor",
  label: "Border Color",
  inputType: "input",
};

export const BADGE_TEXT_COLOR_DEFAULTS = {
  id: "textColor",
  label: "Text Color",
  inputType: "input",
};

export const BADGE_LOGO_DEFAULTS = {
  id: "logo",
  label: "Event Icon",
  inputType: "file",
};

export const BADGE_CUSTOM = [
  BADGE_TYPE_DEFAULTS,
  BADGE_BG_COLOR_DEFAULTS,
  BADGE_BORDER_COLOR_DEFAULTS,
  BADGE_MLH_COLOR_DEFAULTS,
  BADGE_TEXT_COLOR_DEFAULTS,
  BADGE_LOGO_DEFAULTS,
];
