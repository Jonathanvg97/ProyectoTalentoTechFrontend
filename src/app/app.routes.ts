import { Routes } from '@angular/router';
import { LandingHomeComponent } from './pages/landing-home/landing-home.component';
import { PATH } from '../core/enum/path.enum';
import { LoginComponent } from './auth/login/login.component';
import { FormCreateUserComponent } from './components/form-create-user/form-create-user.component';

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
    path: PATH.CREATEUSER,
    component: FormCreateUserComponent,
  },
];
