import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuscaEstabelecimentoClienteComponent} from "./core/estabelecimentos/busca-estabelecimento-cliente/busca-estabelecimento-cliente.component";
import {PaginaNaoEncontradaComponent} from "./pagina-nao-encontrada/pagina-nao-encontrada.component";

const routes: Routes = [
  {
    path: '',
    component: BuscaEstabelecimentoClienteComponent,
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./core/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'parceiros',
    loadChildren: () => import('./core/parceiros/parceiros.module').then(m => m.ParceirosModule)
  },
  {
    path: 'estabelecimentos',
    loadChildren: () => import('./core/estabelecimentos/estabelecimentos.module').then(m => m.EstabelecimentosModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./core/produtos/produtos.module').then(m => m.ProdutosModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./core/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./core/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'pagina-nao-encontrada',
    component: PaginaNaoEncontradaComponent
  },
  {
    path: '**',
    redirectTo: '/pagina-nao-encontrada'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
