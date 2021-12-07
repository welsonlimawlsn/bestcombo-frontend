import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlertaDialogComponent} from "../shared/alerta-dialog/alerta-dialog.component";
import {ConfirmacaoDialogComponent} from "../shared/confirmacao-dialog/confirmacao-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  showAlerta(titulo: string, mensagem: string) {
    return this.dialog.open(AlertaDialogComponent, {
      data: {
        titulo: titulo,
        mensagem: mensagem
      }
    });
  }

  pedeConfirmacao(mensangem: string) {
    return this.dialog.open(ConfirmacaoDialogComponent, {
      data: {
        mensagem: mensangem
      }
    });
  }
}
