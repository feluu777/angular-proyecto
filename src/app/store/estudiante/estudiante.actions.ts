import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { students } from '../../core/models/students';

export const EstudianteActions = createActionGroup({
  source: 'Estudiante',
  events: {
    'Load Estudiantes': emptyProps(),
    'Load Estudiantes Success': props<{ estudiantes: students[] }>(),
    'Load Estudiantes Failure': props<{ error: any }>(),

    'Add Estudiante': props<{ estudiante: students }>(),
    'Add Estudiante Success': props<{ estudiante: students }>(),
    'Add Estudiante Failure': props<{ error: any }>(),

    'Delete Estudiante': props<{ id: string }>(),
    'Delete Estudiante Success': props<{ id: string }>(),
    'Delete Estudiante Failure': props<{ error: any }>(),

    'Edit Estudiante': props<{ estudiante: students }>(),

    'Update Estudiante Course': props<{ id: string; course: string }>(),
    'Update Estudiante Course Success': props<{ estudiante: students }>(),
    'Update Estudiante Course Failure': props<{ error: any }>()
  }
});
