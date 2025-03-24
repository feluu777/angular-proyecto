import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { teachers } from '../../core/models/teachers';

export const TeachersActions = createActionGroup({
  source: 'Teachers',
  events: {
    'Load Teachers': emptyProps(),
    'Load Teachers Success': props<{ teachers: teachers[] }>(),
    'Load Teachers Failure': props<{ error: unknown }>(),
    'Editar Teacher': props<{ teacher: teachers }>(),
    'Editar Teacher Success': props<{ teacher: teachers }>(),
    'Editar Teacher Failure': props<{ error: unknown }>(),
    'Agregar Teacher': props<{ teacher: teachers }>(),
    'Agregar Teacher Success': props<{ teacher: teachers }>(),
    'Agregar Teacher Failure': props<{ error: unknown }>(),
    'Eliminar Teacher': props<{ id: string }>(),
    'Eliminar Teacher Success': props<{ id: string }>(),
    'Eliminar Teacher Failure': props<{ error: unknown }>(),
  }
});
