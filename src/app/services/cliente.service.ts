import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequisicaoService} from "./requisicao.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient,
    private requisicaoService: RequisicaoService
  ) {
  }

  cadastrarCliente(cliente: any) {
    return this.requisicaoService.requisita(
      this.http.post(`${environment.backendUrl}/publico/clientes`, cliente)
    )
  }
}
