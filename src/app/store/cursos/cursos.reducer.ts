import { createReducer, on } from '@ngrx/store';
import { CursosActions } from './cursos.actions';
import { Curso } from '../../core/models/cursos';

export const cursosFeatureKey = 'cursos';

export interface CursosState {
  cursos: Curso[];
}

export const initialState: CursosState = {
  cursos: []
};

export const cursosReducer = createReducer(
  initialState,

  on(CursosActions.loadCursos, (state) => ({
    ...state
  })),

  on(CursosActions.loadCursosSuccess, (state, { curso }) => ({
    ...state,
    cursos: curso
  })),

  on(CursosActions.loadCursosFailure, (state, { error }) => ({
    ...state
  })),

  on(CursosActions.editarCurso, (state, { curso }) => ({
    ...state,
    cursos: state.cursos.map(c => (c.id === curso.id ? curso : c))
  })),

  on(CursosActions.agregarCurso, (state, { curso }) => ({
    ...state,
    cursos: [...state.cursos, curso]
  })),

  on(CursosActions.agregarCursoSuccess, (state, { curso }) => ({
    ...state,
    cursos: [...state.cursos, curso]
  })),

  on(CursosActions.agregarCursoFailure, (state, { error }) => ({
    ...state
  })),

  on(CursosActions.eliminarCurso, (state, { id }) => ({
    ...state,
    cursos: state.cursos.filter(curso => curso.id !== id)
  })),


  on(CursosActions.eliminarCursoSuccess, (state, { id }) => ({
    ...state,
    cursos: state.cursos.filter(curso => curso.id !== id)
  })),

  on(CursosActions.eliminarCursoFailure, (state, { error }) => ({
    ...state
  }))
);
