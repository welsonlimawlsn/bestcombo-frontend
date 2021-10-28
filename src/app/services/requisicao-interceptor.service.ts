import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {UsuarioService} from "./usuario.service";

@Injectable()
export class RequisicaoInterceptorService implements HttpInterceptor {

  constructor(private usuarioService: UsuarioService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.usuarioService.hasUsuarioLogado().pipe(
      switchMap((isLogado) => {
        if (!isLogado) {
          return next.handle(req);
        }
        return this.usuarioService.addTokenToHeader(req.headers)
          .pipe(
            switchMap((h: HttpHeaders) => next.handle(req.clone({headers: h})))
          );
      })
    );
  }
}
