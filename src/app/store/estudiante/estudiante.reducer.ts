import { createFeature, createReducer, on } from '@ngrx/store';
import { EstudianteActions } from './estudiante.actions';
import { students } from '../../core/models/students';

export const estudianteFeatureKey = 'estudiante';

export interface EstudianteState {
  estudiantes: students[];
  loading: boolean;
  error: string | null;
}

export const initialState: EstudianteState = {
  estudiantes: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  // Cargando estudiantes
  on(EstudianteActions.loadEstudiantes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Carga exitosa
  on(EstudianteActions.loadEstudiantesSuccess, (state, { estudiantes }) => ({
    ...state,
    estudiantes,  // ✅ Corregido
    loading: false,
  })),

  // Error en la carga
  on(EstudianteActions.loadEstudiantesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,  // ✅ Corregido
  })),

  // Agregar estudiante
  on(EstudianteActions.addEstudiante, (state, { estudiante }) => ({
    ...state,
    estudiantes: [...state.estudiantes, estudiante],  // ✅ Ahora usa el nombre correcto
  })),

  // Eliminar estudiante
  on(EstudianteActions.deleteEstudiante, (state, { id }) => ({
    ...state,
    estudiantes: state.estudiantes.filter(e => e.id !== id.toString())
  }))
);

export const estudianteFeature = createFeature({
  name: estudianteFeatureKey,
  reducer,
});
