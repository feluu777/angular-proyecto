import { ActionReducerMap } from '@ngrx/store';
import { authFeatureName, authReducer, AuthState } from './auth/auth.reducer';
import { estudianteFeatureKey, EstudiantesState, estudianteReducer } from '../store/estudiante/estudiante.reducer';
import { cursosFeatureKey, cursosReducer, CursosState } from './cursos/cursos.reducer';
import { teachersFeatureKey, teachersReducer, TeachersState } from './teachers/teacher.reducer';

export interface RootState {
    [authFeatureName]: AuthState;
    [estudianteFeatureKey]: EstudiantesState;
    [cursosFeatureKey]: CursosState,
    [teachersFeatureKey]: TeachersState
}

export const rootReducer: ActionReducerMap<RootState> = {
    [authFeatureName]: authReducer,
    [estudianteFeatureKey]: estudianteReducer,
    [cursosFeatureKey]: cursosReducer,
    [teachersFeatureKey]: teachersReducer
};
