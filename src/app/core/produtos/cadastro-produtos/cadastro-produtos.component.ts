import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProdutosService} from "../../../services/produtos.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Categoria} from "../../../services/http/responses-dto";
import {ArquivoService} from "../../../services/arquivo.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.scss']
})
export class CadastroProdutosComponent implements OnInit {

  formulario!: FormGroup;
  descricaoImagemInput: FormControl = new FormControl({value: '', disabled: true}, Validators.required);
  imagem!: File;
  categorias!: Categoria[];

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutosService,
    private dialogRef: MatDialogRef<CadastroProdutosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private arquivoService: ArquivoService
  ) {
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0.01)]],
      quantidadePessoas: ['', [Validators.required, Validators.min(1)]],
      imagem: [''],
      categorias: [[], Validators.required],
      codigoLoja: [this.data.estabelecimento.codigo, Validators.required]
    })

    this.categorias = this.data.categorias.categorias;
  }

  cadastraProduto() {
    if (this.imagem) {
      this.arquivoService.uploadArquivo(this.imagem).pipe(
        switchMap(response => {
          this.formulario.get('imagem')?.setValue(response.nomeArquivo);

          return this.produtoService.novoProduto(this.formulario.value);
        })
      ).subscribe(produto => this.dialogRef.close(produto));
    }
  }

  selecionaImagem(evento: Event) {
    let arquivo = CadastroProdutosComponent.getArquivo(evento);

    if (arquivo) {
      this.descricaoImagemInput.setValue(arquivo.name);
      this.imagem = arquivo;
    }
  }

  private static getArquivo(evento: Event): File | null {
    return ((evento.target as any).files as FileList).item(0);
  }

  fechar() {
    this.dialogRef.close();
  }
}
