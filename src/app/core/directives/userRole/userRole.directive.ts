import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';

@Directive({
  selector: '[userAppRole]',
  standalone: true,
})
export class UserRoleDirective implements OnInit {
  private currentUserRole: string | null = null;  // Almacenar el rol actual del usuario
  private rolesToCheck: string[] = []; // Almacenar los roles a verificar

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.getUserRoleFromToken().subscribe((role) => {
      this.currentUserRole = role ? role.toLowerCase() : null; // Convertir el rol a minúsculas para comparación
      // console.log('Directiva inicializada. Rol del usuario:', this.currentUserRole);
      this.updateView();
    });
  }

  @Input('userAppRole')
  set userAppRole(roles: string[]) {
    this.rolesToCheck = roles.map(role => role.toLowerCase()); // Convertir todos los roles a minúsculas
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.validateRoles()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private validateRoles(): boolean {
    if (!this.currentUserRole) {
      return false;
    }
    return this.rolesToCheck.includes(this.currentUserRole);
  }
}
