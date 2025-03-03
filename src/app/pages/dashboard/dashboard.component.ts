import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { generarStringAleatorio } from '../../shared/utils';
import { AuthService } from '../../core/services/auth.services';
import { StudentsService } from '../../core/services/students.service';
import { students } from '../../core/models/students';

interface Students {
  id: string;
  name: string;
  lastName: string;
  course: string;
  editing?: boolean;
}



@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cursoSeleccionado: string = '';
  showFiller = false;
  displayedColumns: string[] = ['nombre', 'apellido', 'id', 'curso', 'actions'];
  estudiantesForm: FormGroup;
  estudiantes: students[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private studentsService: StudentsService
  ) {
    this.estudiantesForm = this.fb.group({
      name: [''],
      lastName: [''],
      id: [''],
      course: ['']
    });

  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentsService.getStudents().subscribe((data) => {
      this.estudiantes = data;
    });
  }

  onSubmit(): void {
    const nuevoEstudiante: students = {
      ...this.estudiantesForm.value,
      id: generarStringAleatorio(8),
      editing: false
    };

    this.studentsService.addStudent(nuevoEstudiante).subscribe((student) => {
      this.estudiantes.push(student);
      this.estudiantesForm.reset();
    });
  }

  onDelete(id: string): void {
    this.studentsService.deleteStudentById(id).subscribe(() => {
      this.estudiantes = this.estudiantes.filter((el) => el.id !== id);
    });
  }

  onEdit(estudiante: students): void {
    estudiante.editing = !estudiante.editing;
  }

  onInputChange(estudiante: students, campo: 'name' | 'lastName' | 'id' | 'course', event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      estudiante[campo] = input.value || '';
    }
  }

  onSelectCurso(course: string) {
    this.cursoSeleccionado = course;
    this.estudiantesForm.get('course')?.setValue(course);
  }

  Logout(): void {
    this.authService.Logout();
  }
}