import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersProjects } from "../../../../functions/devpost";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { devpostUsername },
  } = req;

  if (!devpostUsername || Array.isArray(devpostUsername))
    return res.status(400).send("");

  const userProjects = await getUsersProjects(devpostUsername);
  
  if (userProjects.error == 404) {
    return res.status(404).send(`devpost user ${devpostUsername} not found.`)
  }

  return res.json(userProjects.projects);
}
