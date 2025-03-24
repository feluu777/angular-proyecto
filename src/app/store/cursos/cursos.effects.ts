import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CursosActions } from './cursos.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CourseService } from '../../core/services/course.service';
import { Curso } from '../../core/models/cursos';

@Injectable()
export class CursosEffects {
  private actions$ = inject(Actions);

  loadCursos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.loadCursos),
      mergeMap(() =>
        this.cursosService.getCursos().pipe(
          map((cursos) => CursosActions.loadCursosSuccess({ curso: cursos })),
          catchError((error) => of(CursosActions.loadCursosFailure({ error })))
        )
      )
    )
  );

  addCurso$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.agregarCurso),
      mergeMap(({ curso }) =>
        this.cursosService.addCurso(curso).pipe(
          map((cursoCreado) => CursosActions.agregarCursoSuccess({ curso: cursoCreado })),
          catchError((error) => of(CursosActions.agregarCursoFailure({ error })))
        )
      )
    )
  );

  deleteCurso$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.eliminarCurso),
      mergeMap(({ id }) =>
        this.cursosService.deleteCourseById(id).pipe(
          map(() => CursosActions.eliminarCursoSuccess({ id })),
          catchError((error) => of(CursosActions.eliminarCursoFailure({ error })))
        )
      )
    )
  );

  constructor(
    private cursosService: CourseService,
  ) { }
}
