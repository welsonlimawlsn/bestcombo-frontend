import {Component, OnInit} from '@angular/core';
import {EstabelecimentoService} from "../../../services/estabelecimento.service";
import {ProdutosService} from "../../../services/produtos.service";
import {forkJoin} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Loja, Produto} from "../../../services/http/responses-dto";
import {ArquivoService} from "../../../services/arquivo.service";

@Component({
  selector: 'app-vizualiza-estabelecimento',
  templateUrl: './visualiza-estabelecimento.component.html',
  styleUrls: ['./visualiza-estabelecimento.component.scss']
})
export class VisualizaEstabelecimentoComponent implements OnInit {

  estabelecimento!: Loja;
  produtos: Produto[] = [];
  servicos: Produto[] = [];

  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private produtoService: ProdutosService,
    private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(params => forkJoin({
          produtos: this.produtoService.listaProdutos({codigoEstabelecimento: params.codigoEstabelecimento}),
          estabelecimento: this.estabelecimentoService.listaEstabecimentos({codigo: params.codigoEstabelecimento})
        }))
      ).subscribe(responses => {
      responses.produtos.produtos.forEach(produto => {
        if (produto.categorias.some(categoria => categoria.tipoServico == 1)) {
          this.produtos.push(produto);
        }
        if (produto.categorias.some(categoria => categoria.tipoServico == 2)) {
          this.servicos.push(produto);
        }
      });
      this.estabelecimento = responses.estabelecimento.lojas[0];
    });
  }

  getImageUrl(imagem: string) {
    return ArquivoService.getImageUrl(imagem);
  }
}
