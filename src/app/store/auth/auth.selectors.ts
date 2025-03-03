import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureName, AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureName);

export const selectAuthUserEmail = createSelector(
    selectAuthState,
    (state) => state.authUser?.email
);

export const selectAuthUser = createSelector(
    selectAuthState,
    (state) => state.authUser
);