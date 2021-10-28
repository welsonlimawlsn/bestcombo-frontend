import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequisicaoService} from "./requisicao.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {


  constructor(
    private http: HttpClient,
    private requisicaoService: RequisicaoService
  ) {
  }

  buscaEnderecoPorCEP(cep: string) {
    return this.requisicaoService.requisita(
      this.http.get(`${environment.backendUrl}/publico/endereco/${cep}`), {showLoading: true}
    )
  }
}
