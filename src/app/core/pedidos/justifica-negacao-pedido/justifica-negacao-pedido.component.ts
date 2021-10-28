import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-justifica-negacao-pedido',
  templateUrl: './justifica-negacao-pedido.component.html',
  styleUrls: ['./justifica-negacao-pedido.component.scss']
})
export class JustificaNegacaoPedidoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<JustificaNegacaoPedidoComponent>
  ) {
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      justificativa: ['', Validators.required]
    });
  }

  justifica() {
    if (this.formulario.valid) {
      this.dialogRef.close(this.formulario.get('justificativa')?.value)
    }
  }

}
