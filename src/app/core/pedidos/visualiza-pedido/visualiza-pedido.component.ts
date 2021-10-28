import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UsuarioService} from "../../../services/usuario.service";
import {PedidosService} from "../../../services/pedidos.service";
import {JustificaNegacaoPedidoComponent} from "../justifica-negacao-pedido/justifica-negacao-pedido.component";

@Component({
  selector: 'app-visualiza-pedido',
  templateUrl: './visualiza-pedido.component.html',
  styleUrls: ['./visualiza-pedido.component.scss']
})
export class VisualizaPedidoComponent implements OnInit {

  pedido!: any;
  isCliente: boolean = false;
  isParceiro: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private usuarioService: UsuarioService,
    private pedidosService: PedidosService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.pedido = this.data.pedido;
    this.isCliente = this.usuarioService.isCliente();
    this.isParceiro = this.usuarioService.isParceiro();
  }

  aceitaPedido() {
    this.pedidosService.aceitaPedido(this.pedido.codigo).subscribe();
  }

  recusaPedido() {
    this.dialog.open(JustificaNegacaoPedidoComponent).afterClosed()
      .subscribe(motivo => {
        if (motivo) {
          this.pedidosService.recusaPedido(this.pedido.codigo, motivo).subscribe()
        }
      });
  }

  concluiPedido() {
    this.pedidosService.concluiPedido(this.pedido.codigo).subscribe();
  }

  podeConcluirPedido() {
    return this.isParceiro
      && this.pedido.situacao === 'PARCEIRO_PREPARANDO_PEDIDO'
      && new Date(this.pedido.dataHoraAgendamento) < new Date();
  }
}
