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
    let ultimaSemana = new Date();
    ultimaSemana.setHours(0, 0, 0, 0);
    ultimaSemana.setDate(ultimaSemana.getDate() - 7);

    forkJoin({
      solicitacoesSaque: this.solicitacaoSaqueService.consultaSolicitacoesPendentes(),
      saldos: this.saldoService.consultaSaldosBestcombo(),
      movimentos: this.movimentoService.consultaMovimentosBestCombo(ultimaSemana)
    }).subscribe(responses => {
      this.solicitacoes = responses.solicitacoesSaque.solicitacoesSaque;
      this.saldos = responses.saldos;
      this.movimentos = responses.movimentos.movimentos;
    });
  }

  visualizar(element: any) {
    this.dialog.open(VisualizaSolicitacaoSaqueComponent, {data: element})
  }
}
