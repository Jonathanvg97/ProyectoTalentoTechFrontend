import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PATH } from '../../enum/path.enum';
import { tap } from 'rxjs/operators';
import { LoginService } from '../../../services/auth/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(LoginService);

  return authService.isLoggedIn().pipe(
    tap((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        router.navigate([PATH.LOGIN]);
      }
    })
  );
};

