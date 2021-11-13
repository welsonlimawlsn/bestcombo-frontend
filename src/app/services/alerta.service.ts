import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlertaDialogComponent} from "../shared/alerta-dialog/alerta-dialog.component";

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
}
