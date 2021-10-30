import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisualizaSolicitacaoSaqueComponent} from './visualiza-solicitacao-saque/visualiza-solicitacao-saque.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    VisualizaSolicitacaoSaqueComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    VisualizaSolicitacaoSaqueComponent
  ]
})
export class SolicitacaoSaqueModule {
}
