import { NextApiRequest, NextApiResponse } from "next";
import { getUsersProjects } from "../../../../functions/devpost";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { devpostUsername },
  } = req;

  if (!devpostUsername || Array.isArray(devpostUsername))
    return res.status(400).send("");

  const userProjects = await getUsersProjects(devpostUsername);

  if (userProjects.ok !== undefined && !userProjects.ok) {
    let errorMessage: string;
    switch (userProjects.error) {
      case 404:
        errorMessage = `devpost user ${devpostUsername} not found.`;
        break;
      default:
        errorMessage = `ERROR ${userProjects.error}! something went wrong getting projects for ${devpostUsername}`;
        break;
    }
    return res.status(userProjects.error).send(errorMessage);
  }

  return res.json(userProjects.projects);
};
