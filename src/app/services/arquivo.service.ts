import {Injectable} from '@angular/core';
import {RequisicaoService} from "./requisicao.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UploadImagemResponse} from "./http/responses-dto";

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {

  constructor(
    private requisicaoService: RequisicaoService,
    private http: HttpClient
  ) {
  }

  uploadArquivo(file: File) {
    let formData = new FormData();
    formData.append('file', file);

    return this.requisicaoService.requisita(
      this.http.post<UploadImagemResponse>(`${environment.backendUrl}/arquivos/upload`, formData)
    )
  }

  static getImageUrl(image: string) {
    return `${environment.backendUrl}/publico/arquivos/download/${image}`;
  }
}
