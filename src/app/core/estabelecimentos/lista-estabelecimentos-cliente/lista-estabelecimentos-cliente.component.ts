import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {EstabelecimentoService} from "../../../services/estabelecimento.service";
import {ArquivoService} from "../../../services/arquivo.service";

@Component({
  selector: 'app-lista-estabelecimentos-cliente',
  templateUrl: './lista-estabelecimentos-cliente.component.html',
  styleUrls: ['./lista-estabelecimentos-cliente.component.scss']
})
export class ListaEstabelecimentosClienteComponent implements OnInit {

  esbelecimentos!: any[];

  constructor(
    private activateRoute: ActivatedRoute,
    private estabelecimentoService: EstabelecimentoService
  ) {
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.pipe(
      switchMap(queryParams => this.estabelecimentoService.buscaEstabelecimentoPorTermo(queryParams.termo))
    ).subscribe(response => this.esbelecimentos = response.lojas);
  }

  getImageUrl(produto: any) {
    return ArquivoService.getImageUrl(produto.imagem);
  }
}
