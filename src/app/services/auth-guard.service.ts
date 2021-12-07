import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanLoad, Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";
import {Observable} from 'rxjs';

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
      await this.router.navigate(['sem-permissao']);
      return false;
    }

    return hasPermission;
  }
}
