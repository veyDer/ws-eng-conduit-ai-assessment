import { createFeature, createReducer, on } from '@ngrx/store';
import { rosterActions } from './roster.actions';
import { RosterState } from '../../models/roster.model';

export const rosterInitialState: RosterState = {
    data: {
        stats: [],
    },
    loading: false,
    loaded: false,
};

// generate the `rosterFeature` feature
export const rosterFeature = createFeature({
    name: 'roster',
    reducer: createReducer(
        rosterInitialState,
        on(rosterActions.loadRosterSuccess, (state, action) => ({
            ...state,
            data: action.roster,
            loaded: true,
            loading: false,
        })),
        on(rosterActions.loadRosterFailure, (state) => ({
            ...state,
            data: rosterInitialState.data,
            loaded: false,
            loading: false,
        })),
    ),
});