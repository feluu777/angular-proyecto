import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeachersActions } from './teacher.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TeachersService } from '../../core/services/teachers.service';
import { teachers } from '../../core/models/teachers';

@Injectable()
export class TeachersEffects {
  private actions$ = inject(Actions);

  loadTeachers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeachersActions.loadTeachers),
      mergeMap(() =>
        this.teachersService.getTeachers().pipe(
          map((teachers: teachers[]) => TeachersActions.loadTeachersSuccess({ teachers })),
          catchError((error) => of(TeachersActions.loadTeachersFailure({ error })))
        )
      )
    )
  );

  addTeacher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeachersActions.agregarTeacher),
      mergeMap(({ teacher }) =>
        this.teachersService.addTeacher(teacher).pipe(
          map((teacherCreado: teachers) => TeachersActions.agregarTeacherSuccess({ teacher: teacherCreado })),
          catchError((error) => of(TeachersActions.agregarTeacherFailure({ error })))
        )
      )
    )
  );

  deleteTeacher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeachersActions.eliminarTeacher),
      mergeMap(({ id }) =>
        this.teachersService.deleteTeacherById(id).pipe(
          map(() => TeachersActions.eliminarTeacherSuccess({ id })),
          catchError((error) => of(TeachersActions.eliminarTeacherFailure({ error })))
        )
      )
    )
  );

  constructor(
    private teachersService: TeachersService,
  ) { }
}
