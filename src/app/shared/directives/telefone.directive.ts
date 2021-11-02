import {Directive, Injector, OnInit} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[telefone]'
})
export class TelefoneDirective implements OnInit {

  private control!: NgControl;
  private _lastMaskedValue = '';

  constructor(
    private injector: Injector,
  ) {
  }

  ngOnInit() {
    this.control = this.injector.get(NgControl);

    if (!this.control || !this.control.valueAccessor) {
      return;
    }

    const originalWriteVal = this.control.valueAccessor.writeValue.bind(this.control.valueAccessor);
    this.control.valueAccessor.writeValue = (val: any) => originalWriteVal(this._maskValue(val));

    const originalChange = (<any>this.control.valueAccessor)['onChange'].bind(this.control.valueAccessor);
    this.control.valueAccessor.registerOnChange((val: any) => originalChange(this._unmaskValue(val)));

    this._setVal(this._maskValue(this.control.value));
  }

  private _maskValue(val: string): string {
    if (val === this._lastMaskedValue) {
      return val;
    }

    return this._lastMaskedValue =
      this.valueToFormat(
        val, this._lastMaskedValue.length > val.length,
        this._lastMaskedValue);
  }

  private valueToFormat(val: string, b: boolean, _lastMaskedValue: string) {
    let numeros = val.split("")
      .filter(c => '1234567890'.includes(c));

    let mascara = numeros.length <= 10 ? '(##) ####-####' : '(##) #####-####';

    numeros.forEach(c => mascara = mascara.replace("#", c));

    let position = mascara.search("#");
    if (position >= 0) {
      mascara = mascara.substring(0, position);
    }

    while (mascara && !'0123456789'.includes(mascara.charAt(mascara.length - 1))) {
      mascara = mascara.substring(0, mascara.length - 1);
    }
    return mascara;
  }

  private _unmaskValue(val: string): string {
    const maskedVal = this._maskValue(val);
    const unmaskedVal = this.unmaskValue(maskedVal);

    if (maskedVal !== val) {
      this._setVal(maskedVal);
    }

    return maskedVal ? unmaskedVal : '';
  }

  private unmaskValue(maskedVal: string) {
    return maskedVal.split("").filter(c => '1234567890'.includes(c)).join('');
  }

  private _setVal(val: string) {
    if (this.control.control) {
      this.control.control.setValue(val, {emitEvent: false});
    }
  }

}
