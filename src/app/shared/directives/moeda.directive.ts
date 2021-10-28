import {Directive, Injector} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[moeda]'
})
export class MoedaDirective {
  private _lastMaskedValue = '';

  constructor(
    private injector: Injector,
    private currency: CurrencyPipe,
    private control: NgControl
  ) {
  }

  ngOnInit() {
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
      this.valueToFormat(val, this._lastMaskedValue);
  }

  private valueToFormat(val: string, _lastMaskedValue: string) {
    return this.currency.transform(MoedaDirective.unmaskValue(val), 'BRL') ?? '';
  }

  private _unmaskValue(val: string): string {
    const maskedVal = this._maskValue(val);
    const unmaskedVal = MoedaDirective.unmaskValue(maskedVal);

    if (maskedVal !== val) {
      this._setVal(maskedVal);
    }

    return maskedVal ? unmaskedVal : '';
  }

  private static unmaskValue(maskedVal: string) {
    let unmaskValue = maskedVal.split("")
      .filter(c => '1234567890'.includes(c))
      .join('');

    unmaskValue = "00" + unmaskValue;

    return parseFloat(unmaskValue.substr(0, unmaskValue.length - 2) + '.' + unmaskValue.substr(-2)).toString();
  }

  private _setVal(val: string) {
    if (this.control.control) {
      this.control.control.setValue(val, {emitEvent: false});
    }
  }
}
