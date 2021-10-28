import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UsuarioService} from "../../../services/usuario.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  perfil!: any;

  @Output()
  onMenu = new EventEmitter<void>();
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

  toggleMenu() {
    this.onMenu.emit();
  }

  async logout() {
    await this.usuarioService.logout();
  }

  async login() {
    await this.usuarioService.login({redirectUri: window.location.origin});
  }
}
