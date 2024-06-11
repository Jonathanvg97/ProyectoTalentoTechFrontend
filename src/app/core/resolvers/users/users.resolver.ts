import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';

export const userResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(LoginService).getUserRoleFromToken();
};
