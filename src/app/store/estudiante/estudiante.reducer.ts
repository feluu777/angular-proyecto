
import { createReducer, on } from '@ngrx/store';
import { EstudianteActions } from './estudiante.actions';
import { students } from '../../core/models/students';

export const estudianteFeatureKey = 'estudiantes';

export interface EstudiantesState {
  estudiantes: students[];
}

export const initialState: EstudiantesState = {
  estudiantes: []
};

export const estudianteReducer = createReducer(
  initialState,
  on(EstudianteActions.loadEstudiantes, (state) => ({
    ...state
  })),


  on(EstudianteActions.loadEstudiantesSuccess, (state, { estudiantes }) => ({
    ...state,
    estudiantes
  })),


  on(EstudianteActions.addEstudiante, (state, { estudiante }) => ({
    ...state,
    estudiantes: [...state.estudiantes, estudiante]
  })),


  on(EstudianteActions.deleteEstudiante, (state, { id }) => ({
    ...state,
    estudiantes: state.estudiantes.filter(estudiante => estudiante.id !== id)
  })),


  on(EstudianteActions.editEstudiante, (state, { estudiante }) => ({
    ...state,
    estudiantes: state.estudiantes.map(est =>
      est.id === estudiante.id ? estudiante : est
    )
  })),


  on(EstudianteActions.updateEstudianteCourse, (state, { id, course }) => ({
    ...state,
    estudiantes: state.estudiantes.map(est =>
      est.id === id ? { ...est, course } : est
    )
  }))
);
