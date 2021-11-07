import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequisicaoService} from "./requisicao.service";
import {environment} from "../../environments/environment";
import {ListaPedidosResponse} from "./http/responses-dto";

const mapperSituacaoPedido = {
  'PEDIDO_AGUARDANDO_APROVACAO_PARCEIRO': 'Aguardando a aprovação do parceiro',
  'PEDIDO_AGUARDANDO_PAGAMENTO_CLIENTE': 'Aguardando a aprovação do pagamento',
  'PARCEIRO_PREPARANDO_PEDIDO': 'Preparando o pedido',
  'PEDIDO_ROTA_ENTREGA': 'Em rota de entrega',
  'PEDIDO_CONCLUIDO': 'Concluído',
  'PEDIDO_CANCELADO': 'Cancelado',
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private http: HttpClient,
    private requisicaoService: RequisicaoService
  ) {
  }

  novoPedido(pedido: any) {
    return this.requisicaoService.requisita(
      this.http.post<ListaPedidosResponse>(`${environment.backendUrl}/pedidos`, pedido)
    );
  }

  listaPedidos() {
    return this.requisicaoService.requisita(
      this.http.get<any>(`${environment.backendUrl}/pedidos`)
    );
  }

  buscaPorCodigo(codigo: string) {
    return this.requisicaoService.requisita(
      this.http.get<any>(`${environment.backendUrl}/pedidos/${codigo}`)
    )
  }

  aceitaPedido(codigo: string) {
    return this.alteraSituacaoPedido(codigo, 'PARCEIRO_ACEITA', null);
  }

  situacaoToString(situacao: string) {
    // @ts-ignore
    return mapperSituacaoPedido[situacao];
  }

  recusaPedido(codigo: string, motivo: string) {
    return this.alteraSituacaoPedido(codigo, 'PARCEIRO_RECUSA', motivo);
  }

  concluiPedido(codigo: string) {
    return this.alteraSituacaoPedido(codigo, 'PARCEIRO_CONCLUI', null);
  }

  private alteraSituacaoPedido(codigo: string, respostaParceiro: string, motivoCancelamento: string | null) {
    return this.requisicaoService.requisita(
      this.http.put<any>(`${environment.backendUrl}/pedidos/${codigo}`, {
        respostaParceiro: respostaParceiro,
        motivoCancelamento: motivoCancelamento
      })
    );
  }
}
