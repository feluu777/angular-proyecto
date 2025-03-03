import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { students } from '../../core/models/students';

export const EstudianteActions = createActionGroup({
  source: 'Estudiante',
  events: {
    'Load Estudiantes': emptyProps(),
    'Load Estudiantes Success': props<{ estudiantes: students[] }>(),  // ✅ Corregido
    'Load Estudiantes Failure': props<{ error: string }>(),  // ✅ Corregido
    'Add Estudiante': props<{ estudiante: students }>(),  // ✅ Coincide con el reducer
    'Delete Estudiante': props<{ id: number }>(),  // ✅ Coincide con el reducer
  }
});
