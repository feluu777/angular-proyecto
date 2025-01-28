import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { generarStringAleatorio } from '../shared/utils';

interface Estudiante {
  nombre: string;
  apellido: string;
  id: string;
  editing: boolean;  // Añadimos la propiedad `editing`
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  drawerOpen = false;
  toggleSidenav() {
    this.drawerOpen = !this.drawerOpen;
  }

  displayedColumns: string[] = ['nombre', 'apellido', 'id', 'actions'];
  showFiller = false;
  estudiantesForm: FormGroup;

  estudiantes: Estudiante[] = [
    { nombre: 'Juan', apellido: 'Pérez', id: 'AIqFFUZU', editing: false },
    { nombre: 'David', apellido: 'Gallegos', id: 'jeSmYR5e', editing: false }
  ];

  constructor(private fb: FormBuilder) {
    this.estudiantesForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      id: ['']
    });
  }

  onSubmit() {
    const nuevoEstudiante: Estudiante = {
      ...this.estudiantesForm.value,
      id: generarStringAleatorio(8),
      editing: false  // Aseguramos que el nuevo estudiante no esté en modo edición
    };
    this.estudiantes.push(nuevoEstudiante);
  }

  onDelete(id: string) {
    this.estudiantes = this.estudiantes.filter((el) => el.id !== id);
  }

  // Función para alternar el estado de edición
  onEdit(estudiante: Estudiante) {
    estudiante.editing = !estudiante.editing;
  }

  onInputChange(estudiante: Estudiante, campo: 'nombre' | 'apellido' | 'id', event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      // Aseguramos que el valor no sea nulo o undefined
      estudiante[campo] = input.value || '';
    }
  }

}

