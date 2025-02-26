import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../core/services/auth.services';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //////////////////

  it('Debe agregar un estudiante', () => {
    component.estudiantesForm.setValue({ nombre: 'María', apellido: 'López', id: 'gR7NnVQC	', curso: 'Angular' });
    component.onSubmit();
    expect(component.estudiantes.length).toBe(3);
  });

  it('Debe eliminar un estudiante', () => {
    component.onDelete('AIqFFUZU');
    expect(component.estudiantes.length).toBe(1);
  });

  it('Debe activar el modo edición', () => {
    const estudiante = component.estudiantes[0];
    component.onEdit(estudiante);
    expect(estudiante.editing).toBeTrue();
  });



});

