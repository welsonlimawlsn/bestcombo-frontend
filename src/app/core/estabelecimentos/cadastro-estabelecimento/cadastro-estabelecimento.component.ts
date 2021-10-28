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
    private enderecoService: EnderecoService
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
    this.formulario.get('endereco.cep')?.valueChanges.pipe(
      filter(cep => cep.length === 8),
      switchMap((cep) => this.enderecoService.buscaEnderecoPorCEP(cep))
    ).subscribe(endereco => this.atualizaEndereco(endereco));
  }

  private atualizaEndereco(endereco: any) {
    this.formulario.get('endereco.rua')?.setValue(endereco.rua);
    this.formulario.get('endereco.cidade')?.setValue(endereco.cidade);
    this.formulario.get('endereco.estado')?.setValue(endereco.estado);
    this.formulario.get('endereco.bairro')?.setValue(endereco.bairro);
  }

  cadastraLoja() {
    if (this.formulario.valid && this.imagem) {
      this.arquivoService.uploadArquivo(this.imagem).pipe(
        switchMap(response => {
          this.formulario.get('imagem')?.setValue(response.nomeArquivo);
          return this.estabelecimentoService.cadastraEstabelecimento(this.formulario.value);
        })
      ).subscribe(() => this.router.navigate(['parceiros']));
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
