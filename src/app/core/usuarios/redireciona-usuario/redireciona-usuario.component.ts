import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../../services/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-redireciona-usuario',
  templateUrl: './redireciona-usuario.component.html',
  styleUrls: ['./redireciona-usuario.component.scss']
})
export class RedirecionaUsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.usuarioService.isParceiro()) {
      this.router.navigate(['parceiros', 'pedidos']);
      return;
    }

    if (this.usuarioService.isAdmin()) {
      this.router.navigate(['admin', 'dashboard']);
      return;
    }

    this.router.navigate(['/']);
  }

}
