import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generarStringAleatorio } from '../../shared/utils';
import { CourseService } from '../../core/services/course.service';
import { AuthService } from '../../core/services/auth.services';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllCursos } from '../../store/cursos/cursos.selectors';
import { CursosActions } from '../../store/cursos/cursos.actions';

interface Curso {
  name: string;
  id: string;
  editing: boolean;
}

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  standalone: false,
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {

  cursoSeleccionado: string = '';
  Cursos$: Observable<Curso[]>;
  cursosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cursoService: CourseService,
    private store: Store
  ) {
    this.cursosForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required]
    });

    this.Cursos$ = this.store.select(selectAllCursos);
  }

  ngOnInit(): void {
    this.cursoService.getCursos().subscribe((cursos) => {
      this.store.dispatch(CursosActions.loadCursosSuccess({ curso: cursos }));
    });
  }


  onSubmit(): void {
    if (this.cursosForm.invalid) {
      return;
    }

    const nuevoCurso: Curso = {
      ...this.cursosForm.value,
      id: generarStringAleatorio(6),
      editing: false
    };

    this.store.dispatch(CursosActions.agregarCurso({ curso: nuevoCurso }));

    this.cursosForm.reset();
  }


  onDelete(id: string): void {
    this.cursoService.deleteCourseById(id).subscribe(() => {
      this.store.dispatch(CursosActions.eliminarCursoSuccess({ id }));
    });
  }

  onEdit(curso: Curso): void {
    const cursoActualizado = { ...curso, editing: !curso.editing };

    if (!cursoActualizado.editing) {
      this.cursoService.updateCurso(cursoActualizado).subscribe(() => {
        this.store.dispatch(CursosActions.editarCurso({ curso: cursoActualizado }));
      });
    } else {
      this.store.dispatch(CursosActions.editarCurso({ curso: cursoActualizado }));
    }
  }

  onSelectCurso(curso: string): void {
    this.cursoSeleccionado = curso;
  }

  onInputChange(curso: Curso, campo: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const nuevoValor = inputElement.value;

    const cursoActualizado = { ...curso, [campo]: nuevoValor };

    this.store.dispatch(CursosActions.editarCurso({ curso: cursoActualizado }));
  }


  Logout(): void {
    this.authService.logout()
  }
}
