export interface DevpostHackathon {
  /**
   * Unique ID for the hackathon
   */
  id: string;
  /**
   * Title of the hackathon
   */
  title: string;
  /**
   * Link to the hackathon's devpost page
   */
  link: string;
  /**
   * URL of the badge image for the hackathon (defaults to the devpost thumbnail)
   */
  badgeImage?: string;
  /**
   * [User Specific] true if the user submitted a project to the hackathon
   */
  userSubmittedProject?: boolean;
  /**
   * [User Specific] true if the project the user submitted won a prize 
   */
  userWonPrize?: boolean;
}