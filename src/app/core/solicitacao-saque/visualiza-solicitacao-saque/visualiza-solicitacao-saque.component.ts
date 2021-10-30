import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SolicitacaoSaqueService} from "../../../services/solicitacao-saque.service";

@Component({
  selector: 'app-visualiza-solicitacao-saque',
  templateUrl: './visualiza-solicitacao-saque.component.html',
  styleUrls: ['./visualiza-solicitacao-saque.component.scss']
})
export class VisualizaSolicitacaoSaqueComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitacaoSaqueService: SolicitacaoSaqueService
  ) {
  }

  ngOnInit(): void {
  }

  colocaEmAndamento() {
    this.alteraSituacao('EM_ANDAMENTO');
  }

  colocaConcluido() {
    this.alteraSituacao('CONCLUIDO');
  }

  private alteraSituacao(situacao: string) {
    this.solicitacaoSaqueService.alteraSituacaoSolicitacao(this.data.codigo, situacao)
      .subscribe(() => this.data.situacaoSolicitacaoSaque = situacao);
  }
}
