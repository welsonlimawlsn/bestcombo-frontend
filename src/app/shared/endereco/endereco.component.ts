import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
import {catchError, distinct, filter, switchMap} from "rxjs/operators";
import {AlertaService} from "../../services/alerta.service";
import {EnderecoService} from "../../services/endereco.service";

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  @Input()
  formulario!: AbstractControl | null;

  constructor(
    private enderecoService: EnderecoService,
    private alertaService: AlertaService
  ) {
  }

  ngOnInit(): void {
    this.subscribeCEPControl().subscribe(endereco => this.atualizaEndereco(endereco));
  }

  private subscribeCEPControl(): Observable<any> {
    return this.formulario?.get('cep')?.valueChanges.pipe(
      filter(cep => cep.length === 8),
      distinct(),
      switchMap((cep) => this.enderecoService.buscaEnderecoPorCEP(cep)),
      filter((cep: any) => {
        let isDF = cep.estado === 'DF';

        if (!isDF) {
          this.alertaService.showAlerta('CEP inválido', 'O bestcombo por enquanto está presente somente no Distrito Federal')
        }

        return isDF;
      }),
      catchError(() => this.subscribeCEPControl())
    ) ?? of();
  }

  private atualizaEndereco(endereco: any) {
    this.formulario?.get('rua')?.setValue(endereco.rua);
    this.formulario?.get('cidade')?.setValue(endereco.cidade);
    this.formulario?.get('estado')?.setValue(endereco.estado);
    this.formulario?.get('bairro')?.setValue(endereco.bairro);
  }

  getFormulario() {
    return this.formulario as FormGroup;
  }
}
