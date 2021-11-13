import {Directive} from '@angular/core';
import {AbstractFilterDirective} from "./abstract-filter.directive";
import {NgControl} from "@angular/forms";
import {CARACTERES_ALFANUMERICOS} from "../constants";

@Directive({
  selector: '[alfanumerico]'
})
export class AlfanumericoDirective extends AbstractFilterDirective {
  constructor(control: NgControl) {
    super(control);
  }

  protected getValidCharacters(): string {
    return ' ' + CARACTERES_ALFANUMERICOS;
  }
}
