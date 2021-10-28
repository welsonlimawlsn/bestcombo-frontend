import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParceiroService} from "../../../services/parceiro.service";
import {UsuarioService} from "../../../services/usuario.service";
import {EnderecoService} from "../../../services/endereco.service";
import {cpfValidator} from "../../../services/validators/cpf-validator";
import {filter, switchMap} from "rxjs/operators";
import {ClienteService} from "../../../services/cliente.service";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {


  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private parceiroService: ParceiroService,
    private usuarioService: UsuarioService,
    private enderecoService: EnderecoService,
    private clienteSetvice: ClienteService
  ) {
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', [Validators.required, cpfValidator]],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
      endereco: this.fb.group({
        cep: ['', Validators.required],
        rua: [{value: '', disabled: true}, Validators.required],
        bairro: [{value: '', disabled: true}, Validators.required],
        cidade: [{value: '', disabled: true}, Validators.required],
        estado: [{value: '', disabled: true}, Validators.required],
        complemento: [''],
        numero: ['', Validators.required]
      }),
      parceiro: [false]
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

  cadastraUsuario() {
    if (this.formulario.valid) {
      if (this.formulario.get('parceiro')?.value) {
        this.parceiroService.cadastraParceiro(this.formulario.value).subscribe(async response => {
          await this.fazerLogin('/parceiros');
        });
      } else {
        this.clienteSetvice.cadastrarCliente(this.formulario.value).subscribe(async response => {
          await this.fazerLogin('/cliente');
        });
      }
    }
  }

  async fazerLogin(redirectUri: string) {
    await this.usuarioService.login({
      redirectUri: window.location.origin + redirectUri
    });
  }
}
