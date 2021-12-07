import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from './logo/logo.component';
import {RouterModule} from "@angular/router";
import {LoadingComponent} from './loading/loading.component';
import {ErroDialogComponent} from './erro-dialog/erro-dialog.component';
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MascaraDirective} from './directives/mascara.directive';
import {MoedaDirective} from './directives/moeda.directive';
import {TelefoneDirective} from "./directives/telefone.directive";
import {HeaderDialogComponent} from './header-dialog/header-dialog.component';
import {AlfanumericoDirective} from './directives/alfanumerico.directive';
import { AlertaDialogComponent } from './alerta-dialog/alerta-dialog.component';
import { AlfabeticoDirective } from './directives/alfabetico.directive';
import { ConfirmacaoDialogComponent } from './confirmacao-dialog/confirmacao-dialog.component';
import { EnderecoComponent } from './endereco/endereco.component';


@NgModule({
  declarations: [
    LogoComponent,
    LoadingComponent,
    ErroDialogComponent,
    MascaraDirective,
    MoedaDirective,
    TelefoneDirective,
    HeaderDialogComponent,
    AlfanumericoDirective,
    AlertaDialogComponent,
    AlfabeticoDirective,
    ConfirmacaoDialogComponent,
    EnderecoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    LogoComponent,
    AngularMaterialModule,
    LoadingComponent,
    ErroDialogComponent,
    ReactiveFormsModule,
    RouterModule,
    MascaraDirective,
    MoedaDirective,
    TelefoneDirective,
    HeaderDialogComponent,
    AlfanumericoDirective,
    AlertaDialogComponent,
    AlfabeticoDirective,
    EnderecoComponent
  ]
})
export class SharedModule {
}
