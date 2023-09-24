import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { rosterActions } from './roster.actions';
import { RosterService } from '../../services/roster.service';

export const loadRoster$ = createEffect(
  (actions$ = inject(Actions), rosterService = inject(RosterService)) => {
    return actions$.pipe(
      ofType(rosterActions.loadRoster),
      concatMap(() =>
        rosterService.getRoster().pipe(
          map((response) => rosterActions.loadRosterSuccess({ roster: response.data })),
          catchError(() => of(rosterActions.loadRosterFailure())),
        ),
      ),
    );
  },
  { functional: true },
);