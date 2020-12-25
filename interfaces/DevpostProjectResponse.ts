import { DevpostProject } from "./DevpostProject";

export interface DevpostProjectResponse {
  /**
   * List of DevpostProjects
   */
  projects: DevpostProject[];
  /**
   * Optional: Response status code
   */
  error?: number;
}