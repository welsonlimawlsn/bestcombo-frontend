import {Component, OnInit} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {UsuarioService} from "./services/usuario.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  perfil!: KeycloakProfile;
  menu = [
    {texto: 'Inicio', link: '/parceiros', roles: ['PAPEL_PARCEIRO']},
    {texto: 'Inicio', link: '/admin/dashboard', roles: ['PAPEL_ADMINISTRADOR']},
    {texto: 'Produtos', link: '/parceiros/produtos', roles: ['PAPEL_PARCEIRO']},
    {texto: 'Pedidos', link: '/parceiros/pedidos', roles: ['PAPEL_PARCEIRO']},
    {texto: 'Extrato', link: '/parceiros/extrato', roles: ['PAPEL_PARCEIRO']},
    {texto: 'Pedidos', link: '/clientes/pedidos', roles: ['PAPEL_CLIENTE']},
  ];

  constructor(
    private usuarioService: UsuarioService,
  ) {
  }

  getMenus() {
    return this.menu.filter(m => m.roles.some(r => this.usuarioService.isUserInRole(r)));
  }

  ngOnInit(): void {
    this.usuarioService.hasUsuarioLogado()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        if (this.isAuthenticated) {
          this.usuarioService.getPerfilUsuario()
            .subscribe(usuario => this.perfil = usuario);
        }
      });
  }
}
