import { inject, Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EstudianteActions } from './estudiante.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { students } from '../../core/models/students';
import { StudentsService } from '../../core/services/students.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EstudianteEffects {
    private actions$ = inject(Actions);

    // Efecto para cargar estudiantes desde la API
    loadEstudiantes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EstudianteActions.loadEstudiantes), // Detecta la acción
            mergeMap(() =>
                this.studentsService.getStudents().pipe(
                    map(estudiantes => EstudianteActions.loadEstudiantesSuccess({ estudiantes })),
                    catchError(error => of(EstudianteActions.loadEstudiantesFailure({ error })))
                )
            )
        )
    );

    // Efecto para agregar un estudiante
    addEstudiante$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EstudianteActions.addEstudiante),
            mergeMap(({ estudiante }) =>
                this.studentsService.addStudent(estudiante).pipe(
                    map(estudianteCreado => EstudianteActions.addEstudianteSuccess({ estudiante: estudianteCreado })),
                    catchError(error => of(EstudianteActions.addEstudianteFailure({ error })))
                )
            )
        )
    );

    // Efecto para eliminar un estudiante
    deleteEstudiante$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EstudianteActions.deleteEstudiante),
            mergeMap(({ id }) =>
                this.studentsService.deleteStudentById(id).pipe(
                    map(() => EstudianteActions.deleteEstudianteSuccess({ id })),
                    catchError(error => of(EstudianteActions.deleteEstudianteFailure({ error })))
                )
            )
        )
    );

    constructor(
        private studentsService: StudentsService,
        private http: HttpClient
    ) { }

}
