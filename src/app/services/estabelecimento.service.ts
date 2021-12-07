import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UsuarioService} from "./usuario.service";
import {RequisicaoService} from "./requisicao.service";
import {catchError, switchMap, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {BuscaLojasResponse} from "./http/responses-dto";

@Injectable()
export class EstabelecimentoService {

  estabelecimento!: any;

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private requisicaoService: RequisicaoService,
    private router: Router
  ) {
  }

  listaEstabecimentos(queryParams: any) {
    return this.requisicaoService.requisita(
      this.http.get<BuscaLojasResponse>(`${environment.backendUrl}/publico/lojas`, {params: queryParams})
    );
  }

  listaUltimosEstabecimentos() {
    return this.requisicaoService.requisita(
      this.http.get<BuscaLojasResponse>(`${environment.backendUrl}/publico/lojas/ultimas`)
    );
  }

  buscaEstabelecimentoParceiroLogado(redirect = true) {
    if (this.estabelecimento) {
      return new Observable<any>(subscriber => {
        subscriber.next(this.estabelecimento);
        subscriber.complete();
      })
    }
    return this.requisicaoService.requisita(
      this.usuarioService.getPerfilUsuario().pipe(
        switchMap(perfil => {
          return this.http.get(`${environment.backendUrl}/parceiros/${perfil.id}/loja`);
        }),
        catchError(err => {
          if (err.error.codigoInterno === 5 && redirect) {
            this.router.navigate(['parceiros', 'estabelecimento', 'cadastro']);
          }
          throw err;
        }),
        tap(loja => this.estabelecimento = loja)
      ), {showErrorDialog: false, showLoading: true}
    );
  }

  cadastraEstabelecimento(estabelecimento: any) {
    return this.requisicaoService.requisita(
      this.usuarioService.getPerfilUsuario().pipe(
        switchMap(perfil => {
          estabelecimento.codigoParceiro = perfil.id;
          return this.http.post(`${environment.backendUrl}/loja`, estabelecimento);
        })
      )
    );
  }

  buscaEstabelecimentoPorTermo(termo: string) {
    return this.requisicaoService.requisita(
      this.http.get<any>(`${environment.backendUrl}/publico/lojas/busca`, {params: {termo: termo}})
    );
  }

  adicionaChavePix(chavePix: string) {
    return this.requisicaoService.requisita(
      this.http.post<any>(`${environment.backendUrl}/loja/pix`, {chavePix: chavePix})
    ).pipe(
      tap(() => this.estabelecimento.chavePix = chavePix)
    );
  }
}
