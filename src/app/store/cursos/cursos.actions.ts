import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Curso } from '../../core/models/cursos';

export const CursosActions = createActionGroup({
  source: 'Cursos',
  events: {
    'Load Cursos': emptyProps(),
    'Load Cursos Success': props<{ curso: Curso[] }>(),
    'Load Cursos Failure': props<{ error: unknown }>(),
    'Editar Curso': props<{ curso: Curso }>(),
    'Agregar Curso': props<{ curso: Curso }>(),
    'Agregar Curso Success': props<{ curso: Curso }>(),
    'Agregar Curso Failure': props<{ error: unknown }>(),
    'Eliminar Curso': props<{ id: string }>(),
    'Eliminar Curso Success': props<{ id: string }>(),
    'Eliminar Curso Failure': props<{ error: unknown }>(),
  }
});
