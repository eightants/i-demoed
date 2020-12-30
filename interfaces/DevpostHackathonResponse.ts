import { DevpostHackathon } from "./DevpostHackathon";

export interface DevpostHackathonResponse {
  /**
   * List of DevpostProjects
   */
  hackathons: DevpostHackathon[];
  /**
   * Optional: Response status code
   */
  error?: number;
  /**
   * Optional: Response ok-ness
   */
  ok?: boolean;
}
