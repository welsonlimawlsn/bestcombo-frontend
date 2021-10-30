import {Injectable} from '@angular/core';
import {RequisicaoService} from "./requisicao.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoSaqueService {

  constructor(
    private requisicaoService: RequisicaoService,
    private http: HttpClient
  ) {
  }

  novoSolicitacaoSaque(solicitacao: number) {
    return this.requisicaoService.requisita(
      this.http.post<any>(`${environment.backendUrl}/solicitacao-saque`, {valor: solicitacao})
    );
  }

  consultaSolicitacaoSaqueAndamento() {
    return this.requisicaoService.requisita(
      this.http.get<any>(`${environment.backendUrl}/solicitacao-saque/andamento`), {
        showErrorDialog: false,
        showLoading: true
      }
    )
  }

  consultaSolicitacoesPendentes() {
    return this.requisicaoService.requisita(
      this.http.get<any>(`${environment.backendUrl}/solicitacao-saque`)
    )
  }

  alteraSituacaoSolicitacao(codigo: string, situacao: string) {
    return this.requisicaoService.requisita(
      this.http.patch<any>(`${environment.backendUrl}/solicitacao-saque/${codigo}`, {situacaoSolicitacaoSaque: situacao})
    );
  }
}
