import { Directive, HostBinding, Optional } from '@angular/core';
import {
  AbstractControlDirective,
  FormControlDirective,
  FormControlName,
  FormGroupDirective
} from '@angular/forms';

@Directive({
  selector: '[appInput]'
})
export class InputDirective {
  private controlDirective: AbstractControlDirective | null | undefined;

  @HostBinding('id') inputId: string;

  constructor(
    private formGroupDirective: FormGroupDirective,
    @Optional() formControlDirective: FormControlDirective,
    @Optional() formControlName: FormControlName
  ) {
    this.controlDirective = formControlDirective || formControlName;
  }

  @HostBinding('class.is-valid')
  get isValid() {
    if (this.controlDirective) {
      return this.controlDirective.valid;
    }
    return undefined;
  }

  @HostBinding('class.is-invalid')
  get isInvalid() {
    if (this.controlDirective) {
      return this.controlDirective.invalid &&
        (this.controlDirective.touched || this.formGroupDirective.submitted);
    }
    return undefined;
  }
}
