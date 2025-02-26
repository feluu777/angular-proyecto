import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';


//Modulos míos


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { SharedModule } from './shared/shared.module';
import { MaestrosComponent } from './pages/maestros/maestros.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
//Modulos angular


import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { provideHttpClient, withFetch } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';













@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MaestrosComponent,
    CursosComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
    MatListModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSidenavModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
