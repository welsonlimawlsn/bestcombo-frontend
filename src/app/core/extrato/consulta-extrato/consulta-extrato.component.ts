import {Component, OnInit} from '@angular/core';
import {SaldoService} from "../../../services/saldo.service";
import {MovimentosService} from "../../../services/movimentos.service";
import {forkJoin} from "rxjs";
import {EstabelecimentoService} from "../../../services/estabelecimento.service";
import {FormControl, Validators} from "@angular/forms";
import {SolicitacaoSaqueService} from "../../../services/solicitacao-saque.service";

@Component({
  selector: 'app-consulta-extrato',
  templateUrl: './consulta-extrato.component.html',
  styleUrls: ['./consulta-extrato.component.scss']
})
export class ConsultaExtratoComponent implements OnInit {

  movimentos!: any[];
  saldos!: any;
  chavePix!: string;
  algumaSolicitacaoSaqueAndamento: boolean = false;

  displayedColumns: string[] = ['dataHora', 'descricao', 'dataHoraEfetivacao', 'valor']
  chavePixControl: FormControl = new FormControl('', Validators.required);
  valorSaque: FormControl = new FormControl('', [Validators.required, Validators.min(1)]);

  constructor(
    private saldoService: SaldoService,
    private movimentoService: MovimentosService,
    private estabelecimentoService: EstabelecimentoService,
    private solicitacaoSaqueService: SolicitacaoSaqueService
  ) {
  }

  ngOnInit(): void {
    let ultimaSemana = new Date();
    ultimaSemana.setHours(0, 0, 0, 0);
    ultimaSemana.setDate(ultimaSemana.getDate() - 7);

    this.estabelecimentoService.buscaEstabelecimentoParceiroLogado().subscribe(
      (estabelecimento) => {
        this.chavePix = estabelecimento.chavePix;
        forkJoin({
          saldos: this.saldoService.consultaSaldos(),
          movimentos: this.movimentoService.consultaMovimentos(ultimaSemana),
        }).subscribe(responses => {
          this.movimentos = responses.movimentos.movimentos;
          this.saldos = responses.saldos;

          this.valorSaque.setValidators([Validators.required, Validators.min(1), Validators.max(this.saldos.valorDisponivel)]);
        });
        this.solicitacaoSaqueService.consultaSolicitacaoSaqueAndamento()
          .subscribe(
            () => this.algumaSolicitacaoSaqueAndamento = true,
            () => this.algumaSolicitacaoSaqueAndamento = false
          )
      }
    );


  }

  adicionaChavePix() {
    if (this.chavePixControl.valid) {
      this.estabelecimentoService.adicionaChavePix(this.chavePixControl.value)
        .subscribe(() => this.chavePix = this.chavePixControl.value);
    }
  }

  pedidoSaque() {
    if (this.valorSaque.valid) {
      this.solicitacaoSaqueService.novoSolicitacaoSaque(this.valorSaque.value)
        .subscribe(() => this.algumaSolicitacaoSaqueAndamento = true)
    }
  }
}
