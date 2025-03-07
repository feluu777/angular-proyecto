
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EstudiantesState } from './estudiante.reducer';

export const selectEstudiantesState = createFeatureSelector<EstudiantesState>('estudiantes');

export const selectAllEstudiantes = createSelector(
  selectEstudiantesState,
  (state) => state.estudiantes
);
