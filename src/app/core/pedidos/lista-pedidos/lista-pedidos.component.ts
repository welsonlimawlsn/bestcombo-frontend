import {Component, OnInit} from '@angular/core';
import {PedidosService} from "../../../services/pedidos.service";
import {Pedido} from "../../../services/http/responses-dto";
import {ArquivoService} from "../../../services/arquivo.service";
import {UsuarioService} from "../../../services/usuario.service";
import {MatDialog} from "@angular/material/dialog";
import {VisualizaPedidoComponent} from "../visualiza-pedido/visualiza-pedido.component";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {

  pedidos!: Pedido[];

  isParceiro: boolean = false;

  constructor(
    private pedidosService: PedidosService,
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.pedidosService.listaPedidos().subscribe(response => this.pedidos = response.pedidos);
    this.isParceiro = this.usuarioService.isParceiro();
  }

  getImageUrl(imagem: string) {
    return ArquivoService.getImageUrl(imagem);
  }

  visualizaPedido(pedido: Pedido) {
    this.pedidosService.buscaPorCodigo(pedido.codigo).pipe(
      switchMap(p => this.dialog.open(VisualizaPedidoComponent, {
        data: {
          pedido: p
        }
      }).afterClosed())
    ).subscribe();
  }
}
