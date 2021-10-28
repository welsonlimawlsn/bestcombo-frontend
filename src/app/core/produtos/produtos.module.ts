import {NgModule} from '@angular/core';
import {ListaProdutosParceiroComponent} from './lista-produtos-parceiro/lista-produtos-parceiro.component';
import {SharedModule} from "../../shared/shared.module";
import {CadastroProdutosComponent} from './cadastro-produtos/cadastro-produtos.component';
import {VisualizaProdutoComponent} from './visualiza-produto/visualiza-produto.component';
import {RouterModule, Routes} from "@angular/router";
import {HeaderModule} from "../header/header.module";


const routes: Routes = [
  {
    path: ':codigoProduto',
    component: VisualizaProdutoComponent
  }
];

@NgModule({
  declarations: [
    ListaProdutosParceiroComponent,
    CadastroProdutosComponent,
    VisualizaProdutoComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    HeaderModule
  ],
  exports: [
    ListaProdutosParceiroComponent,
    CadastroProdutosComponent
  ]
})
export class ProdutosModule {
}
