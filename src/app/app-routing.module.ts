import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { MaestrosComponent } from './pages/maestros/maestros.component';

import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'users',
    canActivate: [adminGuard],
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
