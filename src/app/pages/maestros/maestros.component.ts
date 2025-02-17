import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { generarStringAleatorio } from '../../shared/utils';
interface Maestro {
  nombre: string;
  apellido: string;
  id: string;
  editing: boolean;
  curso: string
}

@Component({
  selector: 'app-maestros',
  standalone: false,

  templateUrl: './maestros.component.html',
  styleUrl: './maestros.component.scss'
})
export class MaestrosComponent {


  cursoSeleccionado: string = '';

  Maestros: Maestro[] = [
    { nombre: 'Alejo', apellido: 'Marzullo', id: 'rC45Czu9', curso: 'Javascript', editing: false, },
    { nombre: 'Fernanda', apellido: 'Fernandez', id: 'FlQUuEqB', curso: 'React', editing: false, }
  ];

  maestrosForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.maestrosForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      id: [''],
      curso: [''],
    });
  }

  onSubmit() {
    const nuevoMaestro: Maestro = {
      ...this.maestrosForm.value,
      id: generarStringAleatorio(6),
      editing: false
    };
    this.Maestros.push(nuevoMaestro);
  }


  onInputChange(maestro: Maestro, campo: 'nombre' | 'apellido' | 'id' | 'curso', event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {

      maestro[campo] = input.value || ''
    }
  }


  onDelete(id: string) {
    this.Maestros = this.Maestros.filter((el) => el.id !== id);
  }


  onEdit(maestro: Maestro) {
    maestro.editing = !maestro.editing;
  }

  onSelectCurso(curso: string) {
    this.cursoSeleccionado = curso;
    this.maestrosForm.get('curso')?.setValue(curso);
  }

}
