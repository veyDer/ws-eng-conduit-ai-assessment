import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@realworld/core/http-client';
import { Roster } from '@realworld/core/api-types';

// generate `RosterService` with the `getRoster()` method returning `Observable<Roster>`
@Injectable({ providedIn: 'root' })
export class RosterService {
  constructor(private apiService: ApiService) {}

  getRoster(): Observable<Roster> {
    return this.apiService.get<Roster>('/roster');
  }
}
