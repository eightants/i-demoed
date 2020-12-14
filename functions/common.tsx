import path from "path";
import fs from "fs";
import { DEVPOST_BADGES } from "./constants";

export function calculateX(ind, per_row, badge_size) {
  return (
    (Math.floor(ind / per_row) % 2) * (badge_size / 2) +
    (ind % per_row) * badge_size
  );
}

export function calculateY(ind, per_row, badge_size) {
  return 2 + Math.floor(ind / per_row) * (badge_size * 0.75 + 4);
}

export function parseDevpostEvents(events) {
  return events.map((elem) => ({
    ...elem,
    filename: elem.id.split(".")[0],
    alt: false,
  }));
}

export function parseCustomEvents(events) {
  return events.map((elem) => ({
    filename: elem.replace("hdb_", ""),
    alt: elem.split("_")[0] == "hdb",
  }));
}

export function badgesFiles(dirPath) {
  const dir = path.resolve("./public", dirPath);
  const filenames = fs.readdirSync(dir);
  return Object.assign({}, ...filenames.map((x) => ({ [x]: 0 })));
}
