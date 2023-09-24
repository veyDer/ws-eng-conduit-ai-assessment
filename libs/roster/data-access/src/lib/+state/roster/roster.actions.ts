import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Roster } from '@realworld/core/api-types';

export const rosterActions = createActionGroup({
  source: 'Roster',
  events: {
    loadRoster: emptyProps(),
    loadRosterSuccess: props<{ roster: Roster }>(),
    loadRosterFailure: emptyProps(),
  },
});