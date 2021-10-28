import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NovoPedidoComponent} from './novo-pedido/novo-pedido.component';
import {SharedModule} from "../../shared/shared.module";
import {ListaPedidosComponent} from './lista-pedidos/lista-pedidos.component';
import {VisualizaPedidoComponent} from './visualiza-pedido/visualiza-pedido.component';
import { JustificaNegacaoPedidoComponent } from './justifica-negacao-pedido/justifica-negacao-pedido.component';

@NgModule({
  declarations: [
    NovoPedidoComponent,
    ListaPedidosComponent,
    VisualizaPedidoComponent,
    JustificaNegacaoPedidoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PedidosModule {
}
