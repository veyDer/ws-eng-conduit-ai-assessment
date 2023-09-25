import { IProfileData } from "../profile/profile.interface";

/* generate and export the RosterSingleRO interface with the following properties:
  authorProfile: IProfileData;
  articlesAuthoredCount: number;
  likesReceivedOnArticlesCount: number;
  firstArticleDate: string; 
*/
export interface RosterSingleRO {
  authorProfile: IProfileData;
  articlesAuthoredCount: number;
  likesReceivedOnArticlesCount: number;
  firstArticleDate: string;
}

/* generate and export the RosterRO interface with the following properties:
  stats: RosterSingleRO[];
*/
export interface RosterRO {
  stats: RosterSingleRO[];
}