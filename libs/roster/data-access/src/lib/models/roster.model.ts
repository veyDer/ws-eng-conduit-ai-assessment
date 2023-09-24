import { Roster } from "@realworld/core/api-types/src";

export interface RosterState {
    data: Roster;
    loading: boolean;
    loaded: boolean;
};
