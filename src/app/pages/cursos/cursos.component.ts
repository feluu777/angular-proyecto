import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CursoService } from '../../core/services/course.service';
import { Curso } from '../../core/models/cursos';
import { generarStringAleatorio } from '../../shared/utils';
import { AuthService } from '../../core/services/auth.services';


@Component({
  selector: 'app-cursos',
  standalone: false,
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {

  cursoSeleccionado: string = '';
  Cursos: Curso[] = [];
  cursosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService
  ) {
    this.cursosForm = this.fb.group({
      nombre: [''],
      id: ['']
    });
  }




  onSubmit() {
    const nuevoCurso: Curso = {
      ...this.cursosForm.value,
      id: generarStringAleatorio(6),
      editing: false
    };
    this.Cursos.push(nuevoCurso);
  }

  onInputChange(curso: Curso, campo: 'nombre' | 'id', event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      curso[campo] = input.value || '';
    }
  }

  onDelete(id: string) {
    this.Cursos = this.Cursos.filter((el) => el.id !== id);
  }

  onEdit(curso: Curso) {
    curso.editing = !curso.editing;
  }

  onSelectCurso(curso: string) {
    this.cursoSeleccionado = curso;
    this.cursosForm.get('curso')?.setValue(curso);
  }

  Logout(): void {
    this.authservice.Logout()
  }

}
