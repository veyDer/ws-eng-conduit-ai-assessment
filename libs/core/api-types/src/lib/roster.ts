// generate the `RosterSingle` interface for the object with the following fields:
// authorProfile - `Profile` object (the author, required)
// articlesAuthoredCount - number of articles authored by the author (or 0)
// likesReceivedOnArticlesCount - number of likes received on all articles authored by the author (or 0)
// firstArticleDate - date of the first article authored by the author (or the empty string)

import { Profile } from './profile';

export interface RosterSingle {
  authorProfile: Profile;
  articlesAuthoredCount: number;
  likesReceivedOnArticlesCount: number;
  firstArticleDate: string;
}

// generate the `Roster` interface for the object with the following fields:
// stats - array of `RosterSingle` objects (required)

export interface Roster {
  stats: RosterSingle[];
}
