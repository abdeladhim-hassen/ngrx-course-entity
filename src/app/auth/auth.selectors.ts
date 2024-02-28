import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from './reducers';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey)
export const isLoggedIn = createSelector(
    selectAuthState,
    auth => !!auth.user
  );
  