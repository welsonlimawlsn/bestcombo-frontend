import {Component, OnInit} from '@angular/core';
import {SolicitacaoSaqueService} from "../../../services/solicitacao-saque.service";
import {forkJoin} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {VisualizaSolicitacaoSaqueComponent} from "../../solicitacao-saque/visualiza-solicitacao-saque/visualiza-solicitacao-saque.component";
import {SaldoService} from "../../../services/saldo.service";
import {MovimentosService} from "../../../services/movimentos.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  solicitacoes!: any[];
  movimentos!: any[];
  saldos!: any;

  data!: Date;

  displayedColumnsExtrato: string[] = ['dataHora', 'descricao', 'dataHoraEfetivacao', 'valor']


  displayedColumns = ['codigo', 'situacao', 'dataUltimaAtualizacao', 'valor', 'visualizar'];

  constructor(
    private solicitacaoSaqueService: SolicitacaoSaqueService,
    private saldoService: SaldoService,
    private movimentoService: MovimentosService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.configuraData();
    let ultimaSemana = new Date();
    ultimaSemana.setHours(0, 0, 0, 0);
    ultimaSemana.setDate(ultimaSemana.getDate() - 7);

    forkJoin({
      solicitacoesSaque: this.solicitacaoSaqueService.consultaSolicitacoesPendentes(),
      movimentos: this.movimentoService.consultaMovimentosBestCombo(ultimaSemana),
      saldosMensal: this.consultaSaldoMensal()
    }).subscribe(responses => {
      this.solicitacoes = responses.solicitacoesSaque.solicitacoesSaque;
      this.saldos = responses.saldosMensal;
      this.movimentos = responses.movimentos.movimentos;
    });
  }

  private consultaSaldoMensal() {
    return this.saldoService.consultaSaldoMensal(this.data.getMonth() + 1, this.data.getFullYear());
  }

  visualizar(element: any) {
    this.dialog.open(VisualizaSolicitacaoSaqueComponent, {data: element})
  }

  private configuraData() {
    this.data = new Date();
    this.data.setDate(1);
  }

  retrocedeMes() {
    this.data.setMonth(this.data.getMonth() - 1);
    this.data = new Date(this.data);
    this.consultaSaldoMensal().subscribe(saldos => this.saldos = saldos);
  }

  avancaMes() {
    this.data.setMonth(this.data.getMonth() + 1);
    this.data = new Date(this.data);
    this.consultaSaldoMensal().subscribe(saldos => this.saldos = saldos);
  }
}
