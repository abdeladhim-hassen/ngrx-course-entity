import { createReducer, on } from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../actions.types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | undefined; 
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => ({
    ...state,
    user: action.user,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: undefined,
  }))
);
