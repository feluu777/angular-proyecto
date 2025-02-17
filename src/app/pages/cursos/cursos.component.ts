import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { generarStringAleatorio } from '../../shared/utils';



interface Curso {
  nombre: string;
  id: string;
  editing: boolean;

}

@Component({
  selector: 'app-cursos',
  standalone: false,

  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  cursoSeleccionado: string = '';

  Cursos: Curso[] = [
    { nombre: 'JS', id: 'rC45Czu9', editing: false, },
    { nombre: 'JS', id: 'FlQUuEqB', editing: false, }
  ];

  cursosForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.cursosForm = this.fb.group({
      nombre: [''],
      id: [''],

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

      curso[campo] = input.value || ''
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

}


