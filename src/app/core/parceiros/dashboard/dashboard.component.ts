import {Component, OnInit} from '@angular/core';
import {EstabelecimentoService} from "../../../services/estabelecimento.service";
import {UsuarioService} from "../../../services/usuario.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit(): void {
    this.usuarioService.getPerfilUsuario().subscribe(value => console.log('value', value));
    this.estabelecimentoService.buscaEstabelecimentoParceiroLogado()
      .subscribe(value => console.log(value));
  }

}
