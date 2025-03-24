import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generarStringAleatorio } from '../../shared/utils';
import { AuthService } from '../../core/services/auth.services';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TeachersActions } from '../../store/teachers/teacher.actions';
import { selectAllTeachers } from '../../store/teachers/teacher.selectors';
import { teachers } from '../../core/models/teachers';
import { TeachersService } from '../../core/services/teachers.service';

@Component({
  selector: 'app-maestros',
  standalone: false,
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.scss']
})
export class MaestrosComponent implements OnInit {

  cursoSeleccionado: string = '';
  Maestros$: Observable<teachers[]>;
  maestrosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authservice: AuthService,
    private store: Store,
    private teacherservice: TeachersService
  ) {
    this.maestrosForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      id: [''],
      course: ['', Validators.required]
    });

    this.Maestros$ = this.store.select(selectAllTeachers);
  }

  ngOnInit(): void {
    this.teacherservice.getTeachers().subscribe((maestros) => {
      this.store.dispatch(TeachersActions.loadTeachersSuccess({ teachers: maestros }));
    });
  }

  onSubmit() {
    if (this.maestrosForm.invalid) {
      return;
    }

    const nuevoMaestro: teachers = {
      ...this.maestrosForm.value,
      id: generarStringAleatorio(6),
      editing: false
    };

    this.teacherservice.addTeacher(nuevoMaestro).subscribe({
      next: (maestroAgregado) => {
        this.store.dispatch(TeachersActions.agregarTeacher({ teacher: maestroAgregado }));
        this.maestrosForm.reset();
      },
      error: (error) => {
        console.error("Error al agregar maestro:", error);
      }
    });
  }

  onDelete(id: string) {
    this.teacherservice.deleteTeacherById(id).subscribe({
      next: () => {
        this.store.dispatch(TeachersActions.eliminarTeacher({ id }));
      },
      error: (error) => {
        console.error("Error al eliminar maestro:", error);
      }
    });
  }

  onEdit(maestro: teachers) {
    const maestroEditado = { ...maestro, editing: !maestro.editing };

    this.teacherservice.updateTeacher(maestroEditado).subscribe({
      next: (maestroActualizado) => {
        this.store.dispatch(TeachersActions.editarTeacher({ teacher: maestroActualizado }));
      },
    });
  }

  onSelectCurso(course: string) {
    this.cursoSeleccionado = course;
    this.maestrosForm.get('course')?.setValue(course);
  }

  onInputChange(maestro: teachers, campo: 'name' | 'lastName' | 'id' | 'course', event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      const maestroActualizado = { ...maestro, [campo]: input.value || '' };

      this.store.dispatch(TeachersActions.editarTeacher({ teacher: maestroActualizado }));
    }
  }



  Logout(): void {
    this.authservice.logout();
  }
}