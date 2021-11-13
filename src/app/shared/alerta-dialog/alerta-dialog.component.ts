import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-alerta-dialog',
  templateUrl: './alerta-dialog.component.html',
  styleUrls: ['./alerta-dialog.component.scss']
})
export class AlertaDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AlertaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }

  ngOnInit(): void {
  }

  getMensagem() {
    return this.data.mensagem;
  }

  getTitulo() {
    return this.data.titulo;
  }

}
