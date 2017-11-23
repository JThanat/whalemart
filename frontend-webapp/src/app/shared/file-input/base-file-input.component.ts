import { Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export abstract class BaseFileInputComponent implements ControlValueAccessor {
  @Input() disabled = false;

  fileList: FileList;
  private onChange: Function;
  private onTouched: Function;

  constructor() {}

  writeValue(value: FileList | undefined | null) {
    if (value) {
      this.fileList = value;
    }
  }

  updateInputFile(event: any) {
    if (!this.disabled) {
      this.fileList = event.target.files;

      if (this.onChange) {
        this.onChange(this.fileList);
      }

      if (this.onTouched) {
        this.onTouched();
      }
    }
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
