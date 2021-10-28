import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CadastroUsuarioComponent} from './cadastro-usuario/cadastro-usuario.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

let routes: Routes = [
  {
    path: 'cadastro',
    component: CadastroUsuarioComponent
  }
];

@NgModule({
  declarations: [
    CadastroUsuarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class UsuariosModule {
}
