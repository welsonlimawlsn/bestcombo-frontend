import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class LoadingService {

  count: number = 0;
  onLoading = new EventEmitter<boolean>();

  public showLoading() {
    this.count++;

    if (this.count >= 1) {
      this.onLoading.emit(true);
    }
  }

  public hideLoading() {
    if (this.count > 0) {
      this.count--;
    }

    if (this.count === 0) {
      this.onLoading.emit(false);
    }
  }
}
