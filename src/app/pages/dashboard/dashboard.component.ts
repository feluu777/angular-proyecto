import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EstudianteActions } from '../../store/estudiante/estudiante.actions';
import { selectAllEstudiantes } from '../../store/estudiante/estudiante.selectors';
import { students } from '../../core/models/students';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generarStringAleatorio } from '../../shared/utils';
import { AuthService } from '../../core/services/auth.services';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  estudiantes$: Observable<students[]>;
  estudiantesForm: FormGroup;
  cursoSeleccionado: string = '';

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public authService: AuthService  // Agregar AuthService aquí
  ) {
    // Inicialización del formulario y otros valores
    this.estudiantesForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      course: ['', Validators.required]
    });

    this.estudiantes$ = this.store.select(selectAllEstudiantes);
  }

  ngOnInit(): void {
    this.store.dispatch(EstudianteActions.loadEstudiantes());
  }

  loadEstudiantes(): void {
    this.store.dispatch(EstudianteActions.loadEstudiantes()); // Disparar acción para cargar estudiantes
  }

  addEstudiante(): void {
    if (this.estudiantesForm.valid) {
      const estudiante: students = {
        ...this.estudiantesForm.value,
        id: generarStringAleatorio(8),  // Generar un id único
        editing: false  // Si deseas que el nuevo estudiante esté en estado de no edición
      };
      this.store.dispatch(EstudianteActions.addEstudiante({ estudiante }));
      this.estudiantesForm.reset();
    }
  }

  deleteEstudiante(id: string): void {
    this.store.dispatch(EstudianteActions.deleteEstudiante({ id })); // Eliminar estudiante
  }


  onInputChange(estudiante: students, campo: keyof students, event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;

    // Crear una copia del estudiante con el nuevo valor actualizado
    const estudianteActualizado = { ...estudiante, [campo]: inputValue };

    // Despachar la acción para actualizar el estado global en NgRx
    this.store.dispatch(EstudianteActions.editEstudiante({ estudiante: estudianteActualizado }));
  }


  onEdit(estudiante: students) {
    const estudianteActualizado = { ...estudiante, editing: !estudiante.editing };
    this.store.dispatch(EstudianteActions.editEstudiante({ estudiante: estudianteActualizado }));
  }


  updateCursoEstudiante(id: string, course: string): void {
    this.store.dispatch(EstudianteActions.updateEstudianteCourse({ id, course }));
  }


  onSelectCurso(Curso: string): void {
    this.cursoSeleccionado = Curso; // Almacena el curso seleccionado
    this.estudiantesForm.get('course')?.setValue(Curso); // Establece el valor del curso en el formulario
  }



  Logout(): void {
    this.authService.logout()
  }

  onSubmit(): void {
    this.addEstudiante(); // Manejar envío del formulario
  }
}