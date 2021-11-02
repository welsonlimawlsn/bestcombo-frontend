import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CadastroProdutosComponent} from "../cadastro-produtos/cadastro-produtos.component";
import {EstabelecimentoService} from "../../../services/estabelecimento.service";
import {switchMap} from "rxjs/operators";
import {ProdutosService} from "../../../services/produtos.service";
import {forkJoin} from "rxjs";
import {CategoriaService} from "../../../services/categoria.service";
import {ArquivoService} from "../../../services/arquivo.service";
import {Produto} from "../../../services/http/responses-dto";

@Component({
  selector: 'app-lista-produtos-parceiro',
  templateUrl: './lista-produtos-parceiro.component.html',
  styleUrls: ['./lista-produtos-parceiro.component.scss']
})
export class ListaProdutosParceiroComponent implements OnInit {

  produtos!: Produto[];

  constructor(private dialog: MatDialog,
              private estabelecimentoService: EstabelecimentoService,
              private produtoService: ProdutosService,
              private categoriaService: CategoriaService
  ) {
  }

  ngOnInit(): void {
    this.atualizaProdutos();
  }

  private atualizaProdutos() {
    this.estabelecimentoService.buscaEstabelecimentoParceiroLogado().pipe(
      switchMap(estabelecimento => this.produtoService.listaProdutos({codigoEstabelecimento: estabelecimento.codigo}))
    ).subscribe(resposta => this.produtos = resposta.produtos.sort((a: any, b: any) => a.nome > b.nome ? 1 : -1));
  }

  cadastraProduto() {
    forkJoin({
      estabelecimento: this.estabelecimentoService.buscaEstabelecimentoParceiroLogado(),
      categorias: this.categoriaService.listaCategorias()
    }).pipe(
      switchMap(response => {
        return this.dialog.open(CadastroProdutosComponent, {
          data: response
        }).afterClosed()
      })
    ).subscribe(value => {
      if (value) {
        this.atualizaProdutos();
      }
    });
  }

  getImageUrl(produto: any) {
    return ArquivoService.getImageUrl(produto.imagem);
  }

  exclui(produto: any) {
    this.produtoService.excluiProduto(produto.codigo).subscribe(() => this.atualizaProdutos());
  }
}
