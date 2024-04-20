import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const roleGuard: (role: string) => CanActivateFn = (role: string) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    console.log('Checkinu ar turiu cia tokena');
    console.log('token value:', authService.getToken());
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
