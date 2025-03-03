import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { generarStringAleatorio } from '../../shared/utils';
import { AuthService } from '../../core/services/auth.services';
import { TeachersService } from '../../core/services/teachers.service';
import { teachers } from '../../core/models/teachers';

interface Teachers {
  id: string;
  name: string;
  lastName: string;
  course: string;
  editing?: boolean;
}

@Component({
  selector: 'app-maestros',
  standalone: false,
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.scss']
})
export class MaestrosComponent implements OnInit {

  cursoSeleccionado: string = '';
  Maestros: teachers[] = [];
  maestrosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private teachersService: TeachersService
  ) {
    this.maestrosForm = this.fb.group({
      name: [''],
      lastName: [''],
      id: [''],
      course: [''],
    });
  }

  ngOnInit(): void {
    this.cargarMaestros();
  }

  cargarMaestros(): void {
    this.teachersService.getTeachers().subscribe((data) => {
      this.Maestros = data;
    });
  }

  onSubmit() {
    const nuevoMaestro: teachers = {
      ...this.maestrosForm.value,
      id: generarStringAleatorio(6),
      editing: false
    };

    this.teachersService.addTeacher(nuevoMaestro).subscribe((teacher) => {
      this.Maestros.push(teacher);
      this.maestrosForm.reset();
    });
  }

  onInputChange(maestro: teachers, campo: 'name' | 'lastName' | 'id' | 'course', event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      maestro[campo] = input.value || '';
    }
  }

  onDelete(id: string) {
    this.teachersService.deleteTeacherById(id).subscribe(() => {
      this.Maestros = this.Maestros.filter((el) => el.id !== id);
    });
  }

  onEdit(maestro: teachers) {
    maestro.editing = !maestro.editing;
  }

  onSelectCurso(course: string) {
    this.cursoSeleccionado = course;
    this.maestrosForm.get('course')?.setValue(course);
  }

  Logout(): void {
    this.authservice.Logout();
  }
}
