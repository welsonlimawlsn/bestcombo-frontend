import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UsuarioService} from "../../../services/usuario.service";
import {PedidosService} from "../../../services/pedidos.service";
import {JustificaNegacaoPedidoComponent} from "../justifica-negacao-pedido/justifica-negacao-pedido.component";
import {AlertaService} from "../../../services/alerta.service";
import {filter, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";

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
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<VisualizaPedidoComponent>,
    private alertaService: AlertaService
  ) {
  }

  ngOnInit(): void {
    this.pedido = this.data.pedido;
    this.isCliente = this.usuarioService.isCliente();
    this.isParceiro = this.usuarioService.isParceiro();
  }

  aceitaPedido() {
    this.pedidosService.aceitaPedido(this.pedido.codigo)
      .pipe(
        switchMap(() => this.alertaService.showAlerta('Sucesso', 'Pedido aceito com sucesso!').afterClosed())
      )
      .subscribe(() => this.dialogRef.close(true), () => this.dialogRef.close(true));
  }

  recusaPedido() {
    this.dialog.open(JustificaNegacaoPedidoComponent).afterClosed()
      .pipe(
        switchMap(motivo => {
          if (motivo) {
            return this.pedidosService.recusaPedido(this.pedido.codigo, motivo)
          }
          return of(false);
        }),
        filter(result => result !== false),
        switchMap(() => this.alertaService.showAlerta('Sucesso', 'Pedido recusado com sucesso!').afterClosed())
      )
      .subscribe(() => this.dialogRef.close(true));
  }

  concluiPedido() {
    this.pedidosService.concluiPedido(this.pedido.codigo)
      .pipe(
        switchMap(() => this.alertaService.showAlerta('Sucesso', 'Pedido concluido com sucesso!').afterClosed())
      )
      .subscribe(() => this.dialogRef.close(true));
  }

  podeConcluirPedido() {
    return this.isParceiro
      && this.pedido.situacao === 'PARCEIRO_PREPARANDO_PEDIDO';
  }
}
