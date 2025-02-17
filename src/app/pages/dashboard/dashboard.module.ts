import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';



import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';


import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MaestrosComponent } from '../maestros/maestros.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';




@NgModule({
  declarations: [
    DashboardComponent,
    MaestrosComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    SharedModule,
    MatListModule,
    RouterModule,
    MatDialogModule,
    MatMenuModule
  ]
})
export class DashboardModule {

}

