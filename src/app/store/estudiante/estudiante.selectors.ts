import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EstudianteState } from './estudiante.reducer';

export const selectStudentsState = createFeatureSelector<EstudianteState>('students');

export const selectAllStudents = createSelector(
  selectStudentsState,
  (state) => state.estudiantes
);
