import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequisicaoService} from "./requisicao.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ParceiroService {

  constructor(
    private http: HttpClient,
    private requisicaoService: RequisicaoService
  ) {
  }

  listaParceiros() {
    return this.requisicaoService.requisita(
      this.http.get(`${environment.backendUrl}/parceiros`)
    );
  }

  cadastraParceiro(value: any) {
    return this.requisicaoService.requisita(
      this.http.post(`${environment.backendUrl}/publico/parceiros`, value)
    );
  }
}
