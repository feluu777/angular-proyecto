import { ActionReducerMap } from '@ngrx/store';
import { authFeatureName, authReducer, AuthState } from './auth/auth.reducer';
import { estudianteFeatureKey, EstudiantesState, estudianteReducer } from '../store/estudiante/estudiante.reducer';

export interface RootState {
    [authFeatureName]: AuthState;
    [estudianteFeatureKey]: EstudiantesState;
}

export const rootReducer: ActionReducerMap<RootState> = {
    [authFeatureName]: authReducer,
    [estudianteFeatureKey]: estudianteReducer,
};
