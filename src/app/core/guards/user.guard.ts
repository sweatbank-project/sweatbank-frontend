import { CanActivateFn, Router } from '@angular/router';
import { roleGuard } from './role.guard';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken() && roleGuard('user')) {
    return true;
  }

  router.navigate(['login']);

  return false;
};
