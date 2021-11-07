import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../../services/auth-guard.service";
import {ListaProdutosParceiroComponent} from "../produtos/lista-produtos-parceiro/lista-produtos-parceiro.component";
import {ListaPedidosComponent} from "../pedidos/lista-pedidos/lista-pedidos.component";
import {ConsultaExtratoComponent} from "../extrato/consulta-extrato/consulta-extrato.component";
import {ExtratoModule} from "../extrato/extrato.module";


let routes: Routes = [
  {
    path: 'produtos',
    component: ListaProdutosParceiroComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: [
        'PAPEL_PARCEIRO'
      ]
    }
  },
  {
    path: 'pedidos',
    component: ListaPedidosComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: [
        'PAPEL_PARCEIRO'
      ]
    }
  },
  {
    path: 'extrato',
    component: ConsultaExtratoComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: [
        'PAPEL_PARCEIRO'
      ]
    }
  },
  {
    path: 'estabelecimento',
    loadChildren: () => import('./../estabelecimentos/estabelecimentos.module').then(m => m.EstabelecimentosModule)
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    ExtratoModule,
    RouterModule.forChild(routes),
  ]
})
export class ParceirosModule {
}
