import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";

@Injectable()
export class AuthGuardService extends KeycloakAuthGuard {

  constructor(
    protected router: Router,
    protected keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
      return false;
    }

    let roles = route.data.roles as string[];

    if (!roles) {
      return false;
    }

    let hasPermission = roles.every(role => this.roles.includes(role));

    if (!hasPermission) {
      await this.router.navigate(['pagina-nao-encontrada']);
      return false;
    }

    return hasPermission;
  }
}
