import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParceiroService} from "../../../services/parceiro.service";
import {UsuarioService} from "../../../services/usuario.service";
import {EnderecoService} from "../../../services/endereco.service";
import {cpfValidator} from "../../../services/validators/cpf-validator";
import {catchError, distinct, filter, switchMap} from "rxjs/operators";
import {ClienteService} from "../../../services/cliente.service";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {AlertaService} from "../../../services/alerta.service";

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
    private clienteSetvice: ClienteService,
    private router: Router,
    private alertaService: AlertaService
  ) {
  }

  ngOnInit(): void {
    this.usuarioService.hasUsuarioLogado().subscribe((hasUser) => {
      if (hasUser) {
        this.router.navigate(['/'])
      }
    });

    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', [Validators.required, cpfValidator]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      usuario: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
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

  }

  cadastraUsuario() {
    if (this.formulario.valid) {
      if (this.formulario.get('parceiro')?.value) {
        this.parceiroService.cadastraParceiro(this.formulario.value)
          .pipe(
            switchMap(response => this.alertaSucesso())
          )
          .subscribe(async response => {
            await this.fazerLogin('/parceiros/estabelecimento/cadastro');
          });
      } else {
        this.clienteSetvice.cadastrarCliente(this.formulario.value)
          .pipe(
            switchMap(response => this.alertaSucesso())
          )
          .subscribe(async response => {
            await this.fazerLogin('/');
          });
      }
    }
  }

  private alertaSucesso() {
    return this.alertaService.showAlerta('Sucesso!', 'Cadastro realizado com sucesso').afterClosed();
  }

  async fazerLogin(redirectUri: string) {
    await this.usuarioService.login({
      redirectUri: window.location.origin + redirectUri,
      loginHint: this.formulario.get('usuario')?.value
    });
  }
}
