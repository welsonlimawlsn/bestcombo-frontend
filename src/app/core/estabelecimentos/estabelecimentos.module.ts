import {NgModule} from '@angular/core';
import {ListaEstabelecimentosClienteComponent} from './lista-estabelecimentos-cliente/lista-estabelecimentos-cliente.component';
import {SharedModule} from "../../shared/shared.module";
import {CadastroEstabelecimentoComponent} from './cadastro-estabelecimento/cadastro-estabelecimento.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../../services/auth-guard.service";
import {CadastroEstabelecimentoGuardService} from "./cadastro-estabelecimento-guard.service";
import {BuscaEstabelecimentoClienteComponent} from './busca-estabelecimento-cliente/busca-estabelecimento-cliente.component';
import {HeaderModule} from "../header/header.module";
import {VisualizaEstabelecimentoComponent} from './visualiza-estabelecimento/visualiza-estabelecimento.component';


let routes: Routes = [
  {
    path: 'busca',
    component: ListaEstabelecimentosClienteComponent,
  },
  {
    path: 'cadastro',
    component: CadastroEstabelecimentoComponent,
    data: {
      roles: [
        'PAPEL_PARCEIRO'
      ]
    },

    canActivate: [
      AuthGuardService,
      CadastroEstabelecimentoGuardService
    ]
  },
  {
    path: ':codigoEstabelecimento',
    component: VisualizaEstabelecimentoComponent
  }
];

@NgModule({
  declarations: [
    ListaEstabelecimentosClienteComponent,
    CadastroEstabelecimentoComponent,
    BuscaEstabelecimentoClienteComponent,
    VisualizaEstabelecimentoComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    HeaderModule
  ],
  exports: [
    ListaEstabelecimentosClienteComponent
  ]
})
export class EstabelecimentosModule {
}
