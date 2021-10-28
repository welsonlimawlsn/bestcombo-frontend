import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {HeaderDeslogadoComponent} from "./header-deslogado/header-deslogado.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    HeaderComponent,
    HeaderDeslogadoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    HeaderDeslogadoComponent
  ]
})
export class HeaderModule {
}
