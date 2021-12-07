import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EstabelecimentoService} from "../../../services/estabelecimento.service";
import {cnpjValidator} from "../../../services/validators/cnpj-validator";
import {Router} from "@angular/router";
import {CategoriaService} from "../../../services/categoria.service";
import {Categoria} from "../../../services/http/responses-dto";
import {ArquivoService} from "../../../services/arquivo.service";
import {filter, switchMap} from "rxjs/operators";
import {EnderecoService} from "../../../services/endereco.service";
import {AlertaService} from "../../../services/alerta.service";

@Component({
  selector: 'app-cadastro-estabelecimento',
  templateUrl: './cadastro-estabelecimento.component.html',
  styleUrls: ['./cadastro-estabelecimento.component.scss']
})
export class CadastroEstabelecimentoComponent implements OnInit {

  formulario!: FormGroup;

  descricaoImagemInput = new FormControl({value: '', disabled: true}, Validators.required);

  imagem!: File;

  categorias!: Categoria[];

  constructor(
    private fb: FormBuilder,
    private estabelecimentoService: EstabelecimentoService,
    private router: Router,
    private categoriaService: CategoriaService,
    private arquivoService: ArquivoService,
    private enderecoService: EnderecoService,
    private alertaService: AlertaService
  ) {
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', [
        Validators.required,
        Validators.minLength(14),
        cnpjValidator
      ]],
      descricao: ['', [Validators.required, Validators.maxLength(500)]],
      categorias: [[], Validators.required],
      imagem: [''],
      telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      endereco: this.fb.group({
        cep: ['', [Validators.required, Validators.minLength(8)]],
        numero: ['', Validators.required],
        rua: [{value: '', disabled: true}, Validators.required],
        bairro: [{value: '', disabled: true}, Validators.required],
        cidade: [{value: '', disabled: true}, Validators.required],
        estado: [{value: '', disabled: true}, Validators.required],
        complemento: [''],
      })
    });

    this.categoriaService.listaCategorias().subscribe(response => {
      this.categorias = response.categorias
        .sort((a, b) => (a.nome as string).localeCompare(b.nome));
    });
  }

  cadastraLoja() {
    if (this.formulario.valid && this.imagem) {
      this.arquivoService.uploadArquivo(this.imagem).pipe(
        switchMap(response => {
          this.formulario.get('imagem')?.setValue(response.nomeArquivo);
          return this.estabelecimentoService.cadastraEstabelecimento(this.formulario.value);
        }),
        switchMap(() => this.alertaService.showAlerta('Sucesso!', 'Cadastro realizado com sucesso!').afterClosed())
      ).subscribe(() => this.router.navigate(['/parceiros', 'produtos']));
    }
  }

  selecionaImagem(evento: Event) {
    let arquivo = this.getArquivo(evento);

    if (arquivo) {
      this.descricaoImagemInput.setValue(arquivo.name);
      this.imagem = arquivo;
    }
  }

  private getArquivo(evento: Event): File | null {
    return ((evento.target as any).files as FileList).item(0);
  }
}
