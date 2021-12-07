import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmacao-dialog',
  templateUrl: './confirmacao-dialog.component.html',
  styleUrls: ['./confirmacao-dialog.component.scss']
})
export class ConfirmacaoDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmacaoDialogComponent>
  ) {
  }

  ngOnInit(): void {
  }

  getMensagem() {
    return this.data.mensagem;
  }

  confirma() {
    this.dialogRef.close(true);
  }

  naoConfirma() {
    this.dialogRef.close(false);
  }
}
