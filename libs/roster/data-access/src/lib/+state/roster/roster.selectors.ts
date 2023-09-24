// generate the selectors
import { rosterFeature } from './roster.reducer';
export const { selectRosterState, selectData, selectLoaded, selectLoading } = rosterFeature;
export const rosterQuery = {
    selectRosterState,
    selectData,
    selectLoaded,
    selectLoading
};
