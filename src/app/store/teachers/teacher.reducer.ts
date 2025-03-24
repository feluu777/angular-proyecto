import { createReducer, on } from '@ngrx/store';
import { TeachersActions } from './teacher.actions';
import { teachers } from '../../core/models/teachers';

export const teachersFeatureKey = 'teachers';

export interface TeachersState {
  teachers: teachers[];
}

export const initialState: TeachersState = {
  teachers: []
};

export const teachersReducer = createReducer(
  initialState,

  on(TeachersActions.loadTeachers, (state) => ({
    ...state
  })),

  on(TeachersActions.loadTeachersSuccess, (state, { teachers }) => ({
    ...state,
    teachers
  })),

  on(TeachersActions.agregarTeacher, (state, { teacher }) => ({
    ...state,
    teachers: [...state.teachers, teacher]
  })),

  on(TeachersActions.eliminarTeacher, (state, { id }) => ({
    ...state,
    teachers: state.teachers.filter(teacher => teacher.id !== id)
  })),

  on(TeachersActions.editarTeacher, (state, { teacher }) => ({
    ...state,
    teachers: state.teachers.map(t =>
      t.id === teacher.id ? teacher : t
    )
  }))
);
