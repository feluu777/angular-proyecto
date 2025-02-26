import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaestrosComponent } from './maestros/maestros.component';
import { CursosComponent } from './cursos/cursos.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'cursos',
    component: CursosComponent
  },
  {
    path: 'maestros',
    component: MaestrosComponent
  },

]

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
