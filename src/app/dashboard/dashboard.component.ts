import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


interface Estudiante {
  nombre: string;
  apellido: string;
  dni: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'actions'];
  dataSource = [];


  estudiantesForm: FormGroup;
  estudiantes = [
    { nombre: 'Juan', apellido: 'Pérez', dni: '12345678' },
    { nombre: 'david', apellido: 'gallegos', dni: '3432423' }

  ];

  constructor(private fb: FormBuilder) {
    this.estudiantesForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      id: ['']
    });
  }

  generateRandomDni(): string {
    return Math.random().toString(36).substring(2, 10);
  }


  onSubmit() {
    // Obtén los valores del formulario
    const nuevoEstudiante: Estudiante = this.estudiantesForm.value;

    // Agrega el nuevo estudiante al array de estudiantes
    this.estudiantes.push(nuevoEstudiante);
  }

  onDelete(dni: string) {
    this.estudiantes = this.estudiantes.filter((el) => el.dni != dni)
  }
}

