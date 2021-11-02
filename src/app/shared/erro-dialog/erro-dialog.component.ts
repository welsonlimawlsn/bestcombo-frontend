import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

let errorMapper = {4: 'Usuário cadastrado, tente fazer o login com a sua conta'};

@Component({
  selector: 'app-erro-dialog',
  templateUrl: './erro-dialog.component.html',
  styleUrls: ['./erro-dialog.component.scss']
})
export class ErroDialogComponent implements OnInit {

  mensagem!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.data?.erro?.error?.codigoInterno) {
      // @ts-ignore
      this.mensagem = errorMapper[this.data?.erro?.error?.codigoInterno];
    }
  }


}
