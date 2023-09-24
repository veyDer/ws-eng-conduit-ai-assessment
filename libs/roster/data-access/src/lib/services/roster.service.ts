import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@realworld/core/http-client';
import { RosterState } from '../models/roster.model';

// generate `RosterService` with the `getRoster()` method returning `Observable<RosterState>`
@Injectable({ providedIn: 'root' })
export class RosterService {
  constructor(private apiService: ApiService) {}

  getRoster(): Observable<RosterState> {
    return this.apiService.get<RosterState>('/roster');
  }
}
