import { NextApiRequest, NextApiResponse } from "next";
import { getUsersHackathons } from "../../../../functions/devpost";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { devpostUsername },
  } = req;

  if (!devpostUsername || Array.isArray(devpostUsername))
    return res.status(400).send("");

  const userHackathons = await getUsersHackathons(devpostUsername);

  if (!userHackathons.ok) {
    let errorMessage: string;
    switch (userHackathons.error) {
      case 404:
        errorMessage = `devpost user ${devpostUsername} not found.`;
        break;
      default:
        errorMessage = `ERROR ${userHackathons.error}! something went wrong getting projects for ${devpostUsername}`;
        break;
    }
    return res.status(userHackathons.error).send(errorMessage);
  }

  return res.json(userHackathons.hackathons);
};
