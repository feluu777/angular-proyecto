import { createReducer, on } from '@ngrx/store';
import { users } from '../../core/users/index';
import { AuthActions } from './auth.action';

export const authFeatureName = 'auth';

export interface AuthState {
    authUser: users | null;
}

const initialState: AuthState = {
    authUser: null,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.setAuthUser, (state, action) => {
        return {
            ...state,
            authUser: action.user,
        };
    }),
    on(AuthActions.unsetAuthUser, (state) => {
        return {
            ...state,
            authUser: null,
        };
    })
);