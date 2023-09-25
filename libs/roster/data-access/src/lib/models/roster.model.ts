import { Roster } from '@realworld/core/api-types';

export interface RosterState {
  data: Roster;
  loading: boolean;
  loaded: boolean;
}
