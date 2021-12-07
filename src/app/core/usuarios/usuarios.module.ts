import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CadastroUsuarioComponent} from './cadastro-usuario/cadastro-usuario.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { RedirecionaUsuarioComponent } from './redireciona-usuario/redireciona-usuario.component';

let routes: Routes = [
  {
    path: 'cadastro',
    component: CadastroUsuarioComponent
  },
  {
    path: 'inicio',
    component: RedirecionaUsuarioComponent
  }
];

@NgModule({
  declarations: [
    CadastroUsuarioComponent,
    RedirecionaUsuarioComponent
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
