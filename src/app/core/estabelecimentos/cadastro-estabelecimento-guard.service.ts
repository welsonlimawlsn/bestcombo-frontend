import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {EstabelecimentoService} from "../../services/estabelecimento.service";
import {UsuarioService} from "../../services/usuario.service";

@Injectable({
  providedIn: 'root'
})
export class CadastroEstabelecimentoGuardService implements CanActivate {

  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private usuarioService: UsuarioService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable(subscriber => {
      if (this.usuarioService.isUserInRole("PAPEL_PARCEIRO")) {
        this.estabelecimentoService.buscaEstabelecimentoParceiroLogado(false).subscribe(
          value => {
            subscriber.next(false);
            subscriber.complete()
          }, error => {
            if (error.error.codigoInterno === 5) {
              subscriber.next(true);
            } else {
              subscriber.next(false);
            }
            subscriber.complete();
          }
        )
      } else {
        subscriber.next(false);
        subscriber.complete()
      }
    });
  }
}
