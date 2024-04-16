import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('Checkinu ar turiu cia tokena');
  console.log('token value:', authService.getToken());
  if (authService.getToken()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
