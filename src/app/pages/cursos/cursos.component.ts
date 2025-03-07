import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { generarStringAleatorio } from '../../shared/utils';
import { CourseService } from '../../core/services/course.service';
import { AuthService } from '../../core/services/auth.services';

interface Curso {
  name: string;
  id: string;
  editing: boolean;
}

@Component({
  selector: 'app-cursos',
  standalone: false,
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursoSeleccionado: string = '';
  Cursos: Curso[] = [];
  cursosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private cursoService: CourseService
  ) {
    this.cursosForm = this.fb.group({
      name: [''],
      id: ['']
    });
  }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursoService.getCursos().subscribe((data) => {
      this.Cursos = data;
    });
  }

  onSubmit(): void {
    const nuevoCurso: Curso = {
      ...this.cursosForm.value,
      id: generarStringAleatorio(6),
      editing: false
    };

    this.cursoService.addCurso(nuevoCurso).subscribe((curso) => {
      this.Cursos.push(curso);
      this.cursosForm.reset();
    });
  }

  onInputChange(curso: Curso, campo: 'name' | 'id', event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      curso[campo] = input.value || '';
    }
  }

  onDelete(id: string): void {
    this.cursoService.deleteCourseById(id).subscribe(() => {
      this.Cursos = this.Cursos.filter((el) => el.id !== id);
    });
  }

  onEdit(curso: Curso): void {
    curso.editing = !curso.editing;
  }

  onSelectCurso(curso: string): void {
    this.cursoSeleccionado = curso;
    this.cursosForm.get('curso')?.setValue(curso);
  }

  Logout(): void {
    this.authservice.logout();
  }
}
