import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.authUser$.pipe(map((authUser) => {
    if (!authUser || authUser.rol !== 'ADMIN') {
      return router.createUrlTree(['login'])
    }
    return authUser.rol === 'ADMIN'
  }))
};
