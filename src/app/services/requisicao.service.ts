import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {LoadingService} from "./loading.service";
import {ErroDialogComponent} from "../shared/erro-dialog/erro-dialog.component";

@Injectable()
export class RequisicaoService {

  constructor(
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {
  }

  requisita<T>(observable: Observable<T>, params = new RequestOptions()): Observable<T> {
    if (params.showLoading) this.loadingService.showLoading();
    return observable.pipe(
      tap(() => this.loadingService.hideLoading()),
      catchError((err, caught) => {
        if (params.showLoading) this.loadingService.hideLoading();
        if (params.showErrorDialog) {
          this.dialog.open(ErroDialogComponent, {
            disableClose: true,
            data: {
              erro: err
            }
          });
        }
        throw err;

        return caught;
      })
    );
  }
}

export class RequestOptions {
  showErrorDialog?: boolean = true;
  showLoading?: boolean = true;
}
