import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';


//Modulos míos

import { CursosComponent } from './pages/cursos/cursos.component';
import { MaestrosComponent } from './pages/maestros/maestros.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';

//Modulos angular
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';









@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,

    CursosComponent,
    MaestrosComponent,





  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    SharedModule,
    MatListModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatMenuModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
