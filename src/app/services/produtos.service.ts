import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RequisicaoService} from "./requisicao.service";
import {environment} from "../../environments/environment";
import {BuscaProdutosResponse, BuscaProdutoUnicoResponse} from "./http/responses-dto";

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(
    private http: HttpClient,
    private requestSevice: RequisicaoService
  ) {
  }

  novoProduto(produto: any) {
    return this.requestSevice.requisita(
      this.http.post(environment.backendUrl + '/produtos', produto)
    )
  }

  listaProdutos(queryParams: any) {
    let params = new HttpParams({fromObject: queryParams});
    return this.requestSevice.requisita(
      this.http.get<BuscaProdutosResponse>(`${environment.backendUrl}/publico/produtos`, {params: params})
    );
  }

  buscaProdutoPorCodigo(codigo: string) {
    return this.requestSevice.requisita(
      this.http.get<BuscaProdutoUnicoResponse>(`${environment.backendUrl}/publico/produtos/${codigo}`)
    );
  }

  buscaProdutoPorTermo(termo: string) {
    return this.requestSevice.requisita(
      this.http.get<any>(`${environment.backendUrl}/publico/produtos/busca`, {params: {termo: termo}})
    );
  }

  excluiProduto(codigo: string) {
    return this.requestSevice.requisita(
      this.http.delete(`${environment.backendUrl}/produtos/${codigo}`)
    )
  }

  listaUltimosProdutos() {
    return this.requestSevice.requisita(
      this.http.get<any>(`${environment.backendUrl}/publico/produtos/ultimos-cadastrados`)
    );
  }
}
