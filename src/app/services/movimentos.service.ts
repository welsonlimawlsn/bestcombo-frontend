import {Injectable} from '@angular/core';
import {RequisicaoService} from "./requisicao.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MovimentosService {

  constructor(
    private requisicaoService: RequisicaoService,
    private http: HttpClient
  ) {
  }

  consultaMovimentos(dataInicio: Date) {
    return this.requisicaoService.requisita(
      this.http.get<any>(`${environment.backendUrl}/movimentos`, {
        params: {
          dataInicio: dataInicio.toISOString()
        }
      })
    )
  }
}
