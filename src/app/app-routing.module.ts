import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { MaestrosComponent } from './pages/maestros/maestros.component';
import { CursosComponent } from './pages/cursos/cursos.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'maestros',
    component: MaestrosComponent
  },
  {
    path: 'cursos',
    component: CursosComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
