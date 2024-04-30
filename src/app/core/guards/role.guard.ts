import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const roleGuard: (role: string) => CanActivateFn = (role: string) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (
      authService.getToken() &&
      authService.getToken() !== undefined &&
      authService.getToken() !== '' &&
      authService.getRole() === role
    ) {
      return true;
    }
    authService.logout();
    router.navigate(['/login']);
    return false;
  };
};
