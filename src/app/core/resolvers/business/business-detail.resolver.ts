import { inject } from '@angular/core';
import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { BusinessDetailsService } from '../../../services/business/busines-details.service';

export const BusinessDetailsResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(BusinessDetailsService).getBusinessDetails();
};
