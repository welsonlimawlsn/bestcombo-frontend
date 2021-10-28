import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../../services/usuario.service";

@Component({
  selector: 'app-header-deslogado',
  templateUrl: './header-deslogado.component.html',
  styleUrls: ['./header-deslogado.component.scss']
})
export class HeaderDeslogadoComponent implements OnInit {

  perfil!: any;
  isAuthenticated!: boolean;

  constructor(
    private usuarioService: UsuarioService
  ) {
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

  async login() {
    await this.usuarioService.login({redirectUri: window.location.origin});
  }

}
