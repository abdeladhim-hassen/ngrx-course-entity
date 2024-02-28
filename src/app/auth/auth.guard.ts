import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';
import { AppState } from '../reducers';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private store: Store<AppState>, 
    private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigateByUrl('/login');
        }
        return loggedIn; 
      })
    );
  }
}
