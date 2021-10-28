import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-busca-estabelecimento-cliente',
  templateUrl: './busca-estabelecimento-cliente.component.html',
  styleUrls: ['./busca-estabelecimento-cliente.component.scss']
})
export class BuscaEstabelecimentoClienteComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      pesquisa: ['', Validators.required]
    })
  }

  buscaLojas() {
    if (this.formulario.valid) {
      this.router.navigate(['estabelecimentos', `busca`], {queryParams: {termo: this.formulario.get('pesquisa')?.value}});
    }
  }
}
