import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header-dialog',
  templateUrl: './header-dialog.component.html',
  styleUrls: ['./header-dialog.component.scss']
})
export class HeaderDialogComponent implements OnInit {

  @Input()
  titulo!: string;

  @Output()
  onFechar = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  fechar() {
    this.onFechar.emit();
  }

}
