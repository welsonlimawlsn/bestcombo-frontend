import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EstabelecimentoService} from "../../../services/estabelecimento.service";
import {ArquivoService} from "../../../services/arquivo.service";
import {ProdutosService} from "../../../services/produtos.service";

@Component({
  selector: 'app-busca-estabelecimento-cliente',
  templateUrl: './busca-estabelecimento-cliente.component.html',
  styleUrls: ['./busca-estabelecimento-cliente.component.scss']
})
export class BuscaEstabelecimentoClienteComponent implements OnInit {

  formulario!: FormGroup;
  produtos!: any[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private estabelecimentoService: EstabelecimentoService,
    private produtoService: ProdutosService
  ) {
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      pesquisa: ['', Validators.required]
    });
    this.produtoService.listaUltimosProdutos().subscribe(response => this.produtos = response.produtos);
  }

  buscaLojas() {
    if (this.formulario.valid) {
      this.router.navigate(['estabelecimentos', `busca`], {queryParams: {termo: this.formulario.get('pesquisa')?.value}});
    }
  }

  getImageUrl(produto: any) {
    return ArquivoService.getImageUrl(produto.imagem);
  }
}
