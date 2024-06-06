import { Routes } from '@angular/router';
import { LandingHomeComponent } from './pages/landing-home/landing-home.component';
import { PATH } from './core/enum/path.enum';
import { LoginComponent } from './auth/login/login.component';
import { FormCreateUserComponent } from './components/form-create-user/form-create-user.component';
import { HomeOpportunityComponent } from './pages/home-opportunity/home-opportunity.component';
import { userResolver } from './core/resolvers/users/users.resolver';
import { FormCreateBussinessComponent } from './components/form-create-bussiness/form-create-bussiness.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { roleGuard } from './core/guards/roleAuth/role.guard';

export const routes: Routes = [
  {
    path: PATH.HOME,
    component: LandingHomeComponent,
  },
  {
    path: PATH.LOGIN,
    component: LoginComponent,
  },
  {
    path: PATH.HOMEOPPORTUNITY,
    component: HomeOpportunityComponent,
    canActivate: [authGuard],
    resolve: {
      user: userResolver,
    },
  },
  {
    path: PATH.CREATEUSER,
    canActivate: [authGuard],
    component: FormCreateUserComponent,
  },
  {
    path: PATH.CREATEBUSINESS,
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    component: FormCreateBussinessComponent,
  },
];
