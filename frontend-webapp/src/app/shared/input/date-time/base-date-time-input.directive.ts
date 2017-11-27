/// <reference path="./flatpickr-locale.d.ts" />

import { ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import * as flatpickr from 'flatpickr';
import { Thai } from 'flatpickr/dist/l10n/th.js';

export abstract class BaseDateTimeInputDirective<T>
  implements OnInit, OnDestroy, ControlValueAccessor {
  @HostBinding('class.datetime') dateRangeClass = true;
  @Input() inlineDatePickerTarget: ElementRef | null = null;

  private datePickerInstance: flatpickr.Instance;
  private onChange: (data: T | null) => void;
  private onTouched: () => void;
  private currentValue: T | null = null;

  constructor(protected elem: ElementRef) {}

  ngOnInit() {
    const containerElem = this.elem.nativeElement as HTMLInputElement;
    this.datePickerInstance = flatpickr(containerElem, {
      locale: Thai,
      dateFormat: 'j M Y',
      inline: this.inlineDatePickerTarget ? true : false,
      appendTo: this.inlineDatePickerTarget ? this.inlineDatePickerTarget.nativeElement : undefined,
      onChange: () => this.checkValue(),
      onClose: () => this.checkValue(),
      ...this.getAdditionalDatePickerInstanceOptions()
    }) as flatpickr.Instance;

    this.updateDatePickerValue(this.currentValue);
  }

  ngOnDestroy() {
    if (this.datePickerInstance) {
      this.datePickerInstance.destroy();
    }
  }

  protected abstract getAdditionalDatePickerInstanceOptions(): flatpickr.Options.Options;

  private checkValue() {
    const newValue = this.getDatePickerValue(this.datePickerInstance.selectedDates);
    if (newValue !== this.currentValue) {
      this.currentValue = newValue;
      this.onChange(newValue);
      this.onTouched();
    }
  }

  protected abstract getDatePickerValue(dates: Date[]): T | null;

  protected abstract updateDatePickerValue(value: T | null): void;

  protected clearDatePickerValue() {
    if (this.datePickerInstance) {
      this.datePickerInstance.clear();
    }
  }

  protected setDatePickerValue(
    date: flatpickr.Options.DateOption | flatpickr.Options.DateOption[]
  ) {
    if (this.datePickerInstance) {
      this.datePickerInstance.setDate(date);
    }
  }

  // ControlValueAccessor hooks.

  writeValue(value: T | undefined | null) {
    if (value) {
      this.currentValue = value;
    } else {
      this.currentValue = null;
    }

    if (this.datePickerInstance) {
      this.updateDatePickerValue(this.currentValue);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
