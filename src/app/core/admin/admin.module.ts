import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../../services/auth-guard.service";
import {SharedModule} from "../../shared/shared.module";
import {SolicitacaoSaqueModule} from "../solicitacao-saque/solicitacao-saque.module";


let routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: [
        'PAPEL_ADMINISTRADOR'
      ]
    }
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SolicitacaoSaqueModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule {
}
