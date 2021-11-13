import {Directive} from '@angular/core';
import {AbstractFilterDirective} from "./abstract-filter.directive";
import {NgControl} from "@angular/forms";
import {CARACTERES_ALFABETICOS} from "../constants";

@Directive({
  selector: '[alfabetico]'
})
export class AlfabeticoDirective extends AbstractFilterDirective {

  constructor(control: NgControl) {
    super(control);
  }

  protected getValidCharacters(): string {
    return ' ' + CARACTERES_ALFABETICOS;
  }
}
