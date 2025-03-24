import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EstudianteActions } from '../../store/estudiante/estudiante.actions';
import { selectAllEstudiantes } from '../../store/estudiante/estudiante.selectors';
import { students } from '../../core/models/students';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generarStringAleatorio } from '../../shared/utils';
import { AuthService } from '../../core/services/auth.services';
import { StudentsService } from '../../core/services/students.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  estudiantes$: Observable<students[]>;
  estudiantesForm: FormGroup;
  cursoSeleccionado: string = '';

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public authService: AuthService,
    private studentsService: StudentsService
  ) {
    this.estudiantesForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      course: ['', Validators.required]
    });

    this.estudiantes$ = this.store.select(selectAllEstudiantes);
  }

  ngOnInit(): void {
    this.studentsService.getStudents().subscribe((estudiantes) => {
      this.store.dispatch(EstudianteActions.loadEstudiantesSuccess({ estudiantes }));
    });
  }

  loadEstudiantes(): void {
    this.store.dispatch(EstudianteActions.loadEstudiantes());
  }

  addEstudiante(): void {
    if (this.estudiantesForm.valid) {
      const nuevoEstudiante: students = {
        ...this.estudiantesForm.value,
        id: generarStringAleatorio(8),
        editing: false
      };

      this.studentsService.addStudent(nuevoEstudiante).subscribe((estudiante) => {
        this.store.dispatch(EstudianteActions.addEstudiante({ estudiante }));
      });

      this.estudiantesForm.reset();
    }
  }

  deleteEstudiante(id: string): void {
    this.studentsService.deleteStudentById(id).subscribe(() => {
      this.store.dispatch(EstudianteActions.deleteEstudiante({ id }));
    });
  }

  onInputChange(estudiante: students, campo: keyof students, event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const estudianteActualizado = { ...estudiante, [campo]: inputValue };

    this.store.dispatch(EstudianteActions.editEstudiante({ estudiante: estudianteActualizado }));
  }

  onEdit(estudiante: students): void {
    const estudianteActualizado = { ...estudiante, editing: !estudiante.editing };

    this.store.dispatch(EstudianteActions.editEstudiante({ estudiante: estudianteActualizado }));

    if (estudianteActualizado.editing) {
      this.studentsService.updateStudent(estudianteActualizado).subscribe(
        (updatedStudent) => {
          this.store.dispatch(EstudianteActions.editEstudiante({ estudiante: updatedStudent }));
        }
      );
    }
  }


  updateCursoEstudiante(id: string, course: string): void {
    this.store.dispatch(EstudianteActions.updateEstudianteCourse({ id, course }));
  }

  onSelectCurso(Curso: string): void {
    this.cursoSeleccionado = Curso;
    this.estudiantesForm.get('course')?.setValue(Curso);
  }

  Logout(): void {
    this.authService.logout();
  }

  onSubmit(): void {
    this.addEstudiante();
  }
}
