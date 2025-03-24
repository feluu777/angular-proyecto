import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';



import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';


import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule, EffectSources } from '@ngrx/effects';
import { EstudianteEffects } from '../../store/estudiante/estudiante.effects';
import { DashboardComponent } from './dashboard.component';







@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    SharedModule,
    MatListModule,
    RouterModule,
    MatDialogModule,
    MatMenuModule,
    MatSidenavModule,
    MatInputModule,
    EffectsModule.forFeature([EstudianteEffects])
  ]
})
export class DashboardModule {

}

