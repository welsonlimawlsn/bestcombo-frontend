import {Component, OnInit} from '@angular/core';
import {SolicitacaoSaqueService} from "../../../services/solicitacao-saque.service";
import {forkJoin} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {VisualizaSolicitacaoSaqueComponent} from "../../solicitacao-saque/visualiza-solicitacao-saque/visualiza-solicitacao-saque.component";
import {SaldoService} from "../../../services/saldo.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  solicitacoes!: any[];
  saldos!: any;

  displayedColumns = ['codigo', 'situacao', 'dataUltimaAtualizacao', 'valor', 'visualizar'];

  constructor(
    private solicitacaoSaqueService: SolicitacaoSaqueService,
    private saldoService: SaldoService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    forkJoin({
      solicitacoesSaque: this.solicitacaoSaqueService.consultaSolicitacoesPendentes(),
      saldos: this.saldoService.consultaSaldosBestcombo()
    }).subscribe(responses => {
      this.solicitacoes = responses.solicitacoesSaque.solicitacoesSaque;
      this.saldos = responses.saldos;
    });
  }

  visualizar(element: any) {
    this.dialog.open(VisualizaSolicitacaoSaqueComponent, {data: element})
  }
}
