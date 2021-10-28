import {Injectable} from '@angular/core';
import {RequisicaoService} from "./requisicao.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ListaCategoriasResponse} from "./http/responses-dto";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categorias!: ListaCategoriasResponse;

  constructor(
    private requisicaoService: RequisicaoService,
    private http: HttpClient
  ) {
  }

  listaCategorias() {
    if (this.categorias) {
      return new Observable<ListaCategoriasResponse>(subscriber => {
        subscriber.next(this.categorias);
        subscriber.complete();
      });
    }

    return this.requisicaoService.requisita(
      this.http.get<ListaCategoriasResponse>(`${environment.backendUrl}/publico/categorias`)
    ).pipe(
      tap(response => {
        this.categorias = response;
        this.categorias.categorias = this.categorias.categorias.sort((a, b) => a.nome > b.nome ? 1 : -1);
      })
    );
  }
}
