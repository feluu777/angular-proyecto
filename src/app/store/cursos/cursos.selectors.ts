import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CursosState } from './cursos.reducer';

export const selectCursosState = createFeatureSelector<CursosState>('cursos');

export const selectAllCursos = createSelector(
  selectCursosState,
  (state) => state.cursos
);
