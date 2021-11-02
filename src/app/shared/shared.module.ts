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
import { HeaderDialogComponent } from './header-dialog/header-dialog.component';


@NgModule({
  declarations: [
    LogoComponent,
    LoadingComponent,
    ErroDialogComponent,
    MascaraDirective,
    MoedaDirective,
    TelefoneDirective,
    HeaderDialogComponent
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
    HeaderDialogComponent
  ]
})
export class SharedModule {
}
