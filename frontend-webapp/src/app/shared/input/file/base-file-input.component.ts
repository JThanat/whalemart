import { Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export abstract class BaseFileInputComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @Input() label = 'เลือกไฟล์';

  fileList: FileList;
  private onChange: Function;
  private onTouched: Function;

  writeValue(value: FileList | undefined | null) {
    if (value instanceof FileList) {
      this.fileList = value;
    }
  }

  updateInputFile(event: Event) {
    if (!this.disabled) {
      this.fileList = (event.target as HTMLInputElement).files!;

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
