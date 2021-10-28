import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultaExtratoComponent} from './consulta-extrato/consulta-extrato.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ConsultaExtratoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ExtratoModule {
}
