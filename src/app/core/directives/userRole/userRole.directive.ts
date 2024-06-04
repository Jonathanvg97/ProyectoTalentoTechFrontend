import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserModel } from '../../models/user.model';
import { LoginService } from '../../../services/auth/login.service';

@Directive({
  selector: '[userAppRole]',
  standalone: true,
})
export class UserRoleDirective implements OnInit {
  private user: UserModel;
  private roles: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private loginService: LoginService
  ) {}

  

  ngOnInit(): void {
    console.log('Actualizando la vista');
    this.user = this.loginService.user;
    console.log('Directiva inicializada. Usuario:', this.user);
    this.updateView();
  }

  @Input('userAppRole')
  set userAppRole(valor: string[]) {
    this.roles = valor;
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.validateRoles()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private validateRoles(): boolean {
    let hasRoles: boolean = false;

    if (this.user && this.user.role) {
      for (let [index, role] of this.roles.entries()) {
        if (this.user.role.toUpperCase() === role) {
          hasRoles = true;
          return hasRoles;
        }
      }
    }
    return hasRoles;
  }
}
