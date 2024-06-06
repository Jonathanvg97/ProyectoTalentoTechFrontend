import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PATH } from '../../enum/path.enum';
import { tap, map } from 'rxjs/operators';
import { LoginService } from '../../../services/auth/login.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(LoginService);

  return authService.getUserRole().pipe(
    map((role: string) => {
      const requiredRole = route.data['role']; // Accede al rol requerido desde la configuración de la ruta
      if (role === requiredRole) {
        return true;
      } else {
        router.navigate([PATH.HOME]); // O cualquier otra página de redirección
        return false;
      }
    }),
    tap((hasAccess) => {
      if (!hasAccess) {
        console.warn('Access denied - You do not have permission to view this page');
      }
    })
  );
};
