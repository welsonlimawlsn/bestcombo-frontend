import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Observable} from "rxjs";
import {KeycloakLoginOptions, KeycloakProfile} from "keycloak-js";
import {RequisicaoService} from "./requisicao.service";

@Injectable()
export class UsuarioService {

  constructor(
    private keycloakService: KeycloakService,
    private requisicaoService: RequisicaoService
  ) {
  }

  getPerfilUsuario(): Observable<KeycloakProfile> {
    return this.requisicaoService.requisita(new Observable(observer => {
      this.keycloakService.loadUserProfile().then(usuario => {
        observer.next(usuario);
        observer.complete();
      }).catch(reason => {
        observer.error(reason);
        observer.complete();
      })
    }));
  }

  hasUsuarioLogado(): Observable<boolean> {
    return this.requisicaoService.requisita(new Observable(o => {
      this.keycloakService.isLoggedIn().then(isLogged => {
        o.next(isLogged);
        o.complete();
      }).catch(error => {
        o.error(error);
        o.complete();
      });
    }));
  }

  addTokenToHeader(headers?: HttpHeaders) {
    return this.requisicaoService.requisita(this.keycloakService.addTokenToHeader(headers));
  }

  isUserInRole(role: string) {
    return this.keycloakService.isUserInRole(role);
  }

  isParceiro() {
    return this.isUserInRole('PAPEL_PARCEIRO');
  }

  isCliente() {
    return this.isUserInRole('PAPEL_CLIENTE');
  }

  async logout() {
    await this.keycloakService.logout(window.location.origin);
  }

  async login(param: KeycloakLoginOptions) {
    await this.keycloakService.login(param);
  }

  isAdmin() {
    return this.isUserInRole('PAPEL_ADMINISTRADOR');
  }
}
