import {Injectable} from '@angular/core';
import {RequisicaoService} from "./requisicao.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  constructor(
    private requisaoService: RequisicaoService,
    private http: HttpClient
  ) {
  }

  consultaSaldos() {
    return this.requisaoService.requisita(
      this.http.get<any>(`${environment.backendUrl}/saldos`)
    )
  }

  consultaSaldosBestcombo() {
    return this.requisaoService.requisita(
      this.http.get<any>(`${environment.backendUrl}/saldos/bestcombo`)
    );
  }

  consultaSaldoMensal(mes: number, ano: number) {
    return this.requisaoService.requisita(
      this.http.get<any>(`${environment.backendUrl}/saldos/mensal`, {
        params: {
          mes: mes,
          ano: ano
        }
      })
    );
  }
}
