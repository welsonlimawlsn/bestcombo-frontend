import {NgControl} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable()
export abstract class AbstractFilterDirective {

  protected constructor(
    protected control: NgControl
  ) {
  }

  ngOnInit(): void {
    if (this.control && this.control.valueAccessor) {
      const originalChange = (<any>this.control.valueAccessor)['onChange'].bind(this.control.valueAccessor);
      this.control.valueAccessor.registerOnChange((val: any) => originalChange(this.filter(val)));
    }
  }

  filter(value: string) {
    let result = value.split("").filter(c => this.getValidCharacters().includes(c)).join("");

    this.setValue(result);

    return result;
  }

  private setValue(result: string) {
    if (this.control.control) {
      this.control.control.setValue(result, {emitEvent: false})
    }
  }

  protected abstract getValidCharacters(): string;
}
