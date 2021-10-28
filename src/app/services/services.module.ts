import {APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule} from '@angular/core';
import {RequisicaoService} from "./requisicao.service";
import {LoadingService} from "./loading.service";
import {EstabelecimentoService} from "./estabelecimento.service";
import {HttpClientModule} from "@angular/common/http";
import {UsuarioService} from "./usuario.service";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {environment} from "../../environments/environment";
import {ParceiroService} from "./parceiro.service";
import {AuthGuardService} from "./auth-guard.service";
import {ProdutosService} from "./produtos.service";
import {EnderecoService} from "./endereco.service";
import {CategoriaService} from "./categoria.service";
import {ArquivoService} from "./arquivo.service";
import {CurrencyPipe} from "@angular/common";
import {SaldoService} from "./saldo.service";
import {MovimentosService} from "./movimentos.service";
import {SolicitacaoSaqueService} from "./solicitacao-saque.service";


function initializeKeycloak(keycloak: KeycloakService) {
  return async () => {
    await keycloak.init({
      config: {
        url: environment.ssoUrl,
        realm: environment.ssoRealm,
        clientId: environment.ssoClientId
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      }
    });
  }
}

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    KeycloakAngularModule
  ],
  exports: [
    HttpClientModule,
    KeycloakAngularModule
  ]
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [
        RequisicaoService,
        LoadingService,
        EstabelecimentoService,
        UsuarioService,
        ParceiroService,
        AuthGuardService,
        ProdutosService,
        EnderecoService,
        CategoriaService,
        ArquivoService,
        CurrencyPipe,
        SaldoService,
        MovimentosService,
        SolicitacaoSaqueService,
        {
          provide: APP_INITIALIZER,
          useFactory: initializeKeycloak,
          multi: true,
          deps: [KeycloakService]
        },

        {
          provide: LOCALE_ID,
          useValue: 'pt-BR'
        }
      ]
    }
  }
}
