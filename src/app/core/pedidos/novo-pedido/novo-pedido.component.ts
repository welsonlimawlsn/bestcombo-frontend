import {Component, OnInit} from '@angular/core';
import {CarrinhoService} from "../../../services/carrinho.service";
import {Produto} from "../../../services/http/responses-dto";
import {ArquivoService} from "../../../services/arquivo.service";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {PedidosService} from "../../../services/pedidos.service";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {AlertaService} from "../../../services/alerta.service";

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.scss']
})
export class NovoPedidoComponent implements OnInit {

  produto!: Produto;
  dataMinima: Date = new Date();

  formulario!: FormGroup;

  constructor(
    private carrinhoService: CarrinhoService,
    private fb: FormBuilder,
    private pedidosService: PedidosService,
    private router: Router,
    private alertaService: AlertaService
  ) {
  }

  ngOnInit(): void {
    let date = new Date();
    date.setDate(new Date().getDate() + 1);

    this.dataMinima = date;

    this.produto = this.carrinhoService.getProduto();

    this.formulario = this.fb.group({
      dataAgendamento: ['', [Validators.required, NovoPedidoComponent.validaDataAgendamento]],
      horaAgendamento: ['', [Validators.required, NovoPedidoComponent.validaHora]],
      quantidade: ['1', [Validators.required, Validators.min(1)]],
      observacao: [''],
      cartao: this.fb.group({
        numero: ['', [Validators.required, Validators.minLength(16)]],
        nome: ['', Validators.required],
        dataVencimento: ['', [Validators.required, NovoPedidoComponent.validaVencimentoCartao]],
        cvv: ['', [Validators.required, Validators.minLength(3)]],
      })
    }, {
      validators: NovoPedidoComponent.validaDataAgendamento
    })
  }

  getImageUrl(imagem: string) {
    return ArquivoService.getImageUrl(imagem);
  }

  static validaHora(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      let time = control.value as string;

      let {hour, minute} = NovoPedidoComponent.getHoraMinuto(time);

      if (time.length != 4 || !(hour >= 0 && hour <= 23) || !(minute >= 0 && minute <= 59)) {
        return {horaInvalida: true};
      }
    }
    return null;
  }

  private static getHoraMinuto(time: string) {
    let hour = Number.parseInt(time.substr(0, 2));
    let minute = Number.parseInt(time.substr(2, 2));
    return {hour, minute};
  }

  static validaVencimentoCartao(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      let data = control.value as string;

      let {mes, ano} = NovoPedidoComponent.getMesAno(data);

      let dataAtual = new Date();

      if (data.length != 4 || !(mes >= 1 && mes <= 12) || ano < dataAtual.getFullYear() || new Date(ano, mes) < dataAtual) {
        return {vencimentoInvalido: true};
      }
    }
    return null;
  }

  private static getMesAno(data: string) {
    let mes = Number.parseInt(data.substr(0, 2));
    let ano = Number.parseInt(new Date().getFullYear().toString().substr(0, 2) + data.substr(2, 2));
    return {mes, ano};
  }

  static validaDataAgendamento(control: AbstractControl): ValidationErrors | null {
    let dataAgendamentoControl = control.get('dataAgendamento');
    let horaAgendamentoControl = control.get('horaAgendamento');

    let dataAgendamentoValidado = dataAgendamentoControl?.dirty && dataAgendamentoControl.valid;
    let horaAgendamentoValidado = horaAgendamentoControl?.dirty && horaAgendamentoControl.valid;

    if (control instanceof FormGroup && dataAgendamentoValidado && horaAgendamentoValidado) {
      let {hour, minute} = NovoPedidoComponent.getHoraMinuto(horaAgendamentoControl?.value);

      let data = dataAgendamentoControl?.value as Date;

      let novaData = NovoPedidoComponent.getDataAgendamento(data, hour, minute);

      let b = novaData <= new Date();

      return b ? {dataHoraAgendamentoInvalido: true} : null;
    }
    return null;
  }

  private static getDataAgendamento(data: Date, hour: number, minute: number) {
    let novaData = new Date(data);

    novaData.setHours(hour, minute);
    return novaData;
  }

  efetuaPedido() {
    if (this.formulario.valid) {
      let dataAgendamento = this.formulario.get('dataAgendamento')?.value;
      let {hour, minute} = NovoPedidoComponent.getHoraMinuto(this.formulario.get('horaAgendamento')?.value);
      let requisicao = {
        codigoEstabelecimento: this.produto.codigoLoja,
        dataAgendamento: NovoPedidoComponent.getDataAgendamento(dataAgendamento, hour, minute).toISOString(),
        cartao: this.formulario.get('cartao')?.value,
        observacao: this.formulario.get('observacao')?.value,
        produtos: [
          {
            codigo: this.produto.codigo,
            quantidade: this.formulario.get('quantidade')?.value
          }
        ]
      }
      this.pedidosService.novoPedido(requisicao)
        .pipe(
          switchMap(requisicao => this.alertaService.showAlerta('Sucesso!', 'O pedido foi efetuado e pode ser visualizado na tela de acompanhamento.').afterClosed())
        )
        .subscribe(() => this.router.navigate(['/clientes', 'pedidos']));
    }
  }
}
