import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersHackathons } from "../../../../functions/devpost";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { devpostUsername },
  } = req;

  if (!devpostUsername || Array.isArray(devpostUsername))
    return res.status(400).send("");

  return res.json(await getUsersHackathons(devpostUsername));
}
