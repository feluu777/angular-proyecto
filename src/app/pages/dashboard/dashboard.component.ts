import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { generarStringAleatorio } from '../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.services';



interface Estudiante {
  nombre: string;
  apellido: string;
  id: string;
  curso: string;
  editing: boolean;

}


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showFiller = false;


  cursoSeleccionado: string = '';


  displayedColumns: string[] = ['nombre', 'apellido', 'id', 'curso', 'actions',];

  estudiantesForm: FormGroup;

  estudiantes: Estudiante[] = [
    { nombre: 'Juan', apellido: 'Pérez', id: 'AIqFFUZU', curso: 'Javascript', editing: false },
    { nombre: 'David', apellido: 'Gallegos', id: 'jeSmYR5e', curso: 'Javascript', editing: false }
  ];

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.estudiantesForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      id: [''],
      curso: ['']
    });
  }

  onSubmit() {
    const nuevoEstudiante: Estudiante = {
      ...this.estudiantesForm.value,
      id: generarStringAleatorio(8),
      editing: false
    };
    this.estudiantes.push(nuevoEstudiante);
    this.estudiantesForm.reset();
  }

  onDelete(id: string) {
    this.estudiantes = this.estudiantes.filter((el) => el.id !== id);
  }


  onEdit(estudiante: Estudiante) {
    estudiante.editing = !estudiante.editing;
  }

  onInputChange(estudiante: Estudiante, campo: 'nombre' | 'apellido' | 'id' | 'curso', event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {

      estudiante[campo] = input.value || ''
    }
  }

  onSelectCurso(curso: string) {
    this.cursoSeleccionado = curso;
    this.estudiantesForm.get('curso')?.setValue(curso);
  }

  Logout(): void {
    this.authService.Logout()
  }

}

