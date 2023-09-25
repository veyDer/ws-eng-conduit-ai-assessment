import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { rosterActions, selectData, selectRosterState } from '@realworld/roster/data-access';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'cdt-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  // add CommonModule to the imports array
  imports: [CommonModule],
})
@UntilDestroy()
export class RosterComponent implements OnInit {
  // add roster variable and pipe it to untilDestroyed
  roster$ = this.store.select(selectRosterState).pipe(
    untilDestroyed(this),
    // add the mapping from state to a copy of state.data.stats sorted by likesReceivedOnArticlesCount descending
    map((state) => [...state.data.stats].sort((a, b) => b.likesReceivedOnArticlesCount - a.likesReceivedOnArticlesCount))
  );

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(rosterActions.loadRoster());
  }
}
