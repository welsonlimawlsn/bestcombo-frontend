import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListaPedidosComponent} from "../pedidos/lista-pedidos/lista-pedidos.component";
import {AuthGuardService} from "../../services/auth-guard.service";
import {SharedModule} from "../../shared/shared.module";
import {PedidosModule} from "../pedidos/pedidos.module";
import {NovoPedidoComponent} from "../pedidos/novo-pedido/novo-pedido.component";


const routes: Routes = [
  {
    path: 'pedidos',
    component: ListaPedidosComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['PAPEL_CLIENTE']
    }
  },
  {
    path: 'pedidos/novo',
    component: NovoPedidoComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['PAPEL_CLIENTE']
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    PedidosModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientesModule {
}
