import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../core/services/auth.services';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [AuthService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe agregar un estudiante', fakeAsync(() => {
    component.estudiantesForm.setValue({ nombre: 'María', apellido: 'López', id: 'gR7NnVQC', curso: 'Angular' });
    component.onSubmit();
    tick();
    fixture.detectChanges();
    component.estudiantes$.subscribe(estudiantes => {
      expect(estudiantes.length).toBe(3);
    });
  }));

  it('Debe eliminar un estudiante', fakeAsync(() => {
    component.deleteEstudiante('AIqFFUZU');
    tick();
    fixture.detectChanges();
    component.estudiantes$.subscribe(estudiantes => {
      expect(estudiantes.length).toBe(1);
    });
  }));

  it('Debe activar el modo edición', () => {
    const estudiante = { id: 'gR7NnVQC', name: 'María', lastName: 'López', course: 'Angular', editing: false }; // Ejemplo de estudiante
    component.onEdit(estudiante);
    expect(estudiante.editing).toBeTrue();
  });
});
