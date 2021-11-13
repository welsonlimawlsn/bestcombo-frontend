import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {EstabelecimentoService} from "../../../services/estabelecimento.service";
import {ArquivoService} from "../../../services/arquivo.service";
import {MatDialog} from "@angular/material/dialog";
import {ErroDialogComponent} from "../../../shared/erro-dialog/erro-dialog.component";

@Component({
  selector: 'app-lista-estabelecimentos-cliente',
  templateUrl: './lista-estabelecimentos-cliente.component.html',
  styleUrls: ['./lista-estabelecimentos-cliente.component.scss']
})
export class ListaEstabelecimentosClienteComponent implements OnInit {

  esbelecimentos!: any[];
  termo!: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private estabelecimentoService: EstabelecimentoService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.pipe(
      switchMap(queryParams => {
        this.termo = queryParams.termo;
        return this.estabelecimentoService.buscaEstabelecimentoPorTermo(queryParams.termo);
      })
    ).subscribe(response => {
      if (response.lojas && response.lojas.length) {
        this.esbelecimentos = response.lojas;
      } else {
        this.dialog.open(ErroDialogComponent, {
          data: {
            erro: {
              error: {
                mensagens: [
                  'Nenhum estabelecimento encontrado com esse termo.'
                ]
              }
            }
          }
        }).afterClosed()
          .subscribe(() => this.router.navigate(['/']))
      }
    });
  }

  getImageUrl(produto: any) {
    return ArquivoService.getImageUrl(produto.imagem);
  }
}
