import {Component, OnInit} from '@angular/core';
import {ProdutosService} from "../../../services/produtos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {Produto} from "../../../services/http/responses-dto";
import {ArquivoService} from "../../../services/arquivo.service";
import {CarrinhoService} from "../../../services/carrinho.service";

@Component({
  selector: 'app-visualiza-produto',
  templateUrl: './visualiza-produto.component.html',
  styleUrls: ['./visualiza-produto.component.scss']
})
export class VisualizaProdutoComponent implements OnInit {

  produto!: Produto;

  constructor(
    private produtoService: ProdutosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private carrinhoService: CarrinhoService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(params => this.produtoService.buscaProdutoPorCodigo(params.codigoProduto))
    ).subscribe(response => this.produto = response.produto);
  }

  getImageUrl(imagem: string) {
    return ArquivoService.getImageUrl(imagem);
  }

  getCategorias() {
    return this.produto.categorias.map(c => c.nome).reduce((previousValue, currentValue) => previousValue + ', ' + currentValue);
  }

  efetuarPedido() {
    this.carrinhoService.adicionaProduto(this.produto);
    this.router.navigate(['/clientes/pedidos/novo']);
  }
}
