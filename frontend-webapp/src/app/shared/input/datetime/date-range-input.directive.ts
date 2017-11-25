/// <reference path="./flatpickr-locale.d.ts" />

import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as flatpickr from 'flatpickr';
import { Thai } from 'flatpickr/dist/l10n/th.js';

import { DateRange } from '../../../core/utils/date-range.service';

@Directive({
  selector: '[appDateRangeInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateRangeInputDirective,
      multi: true
    }
  ]
})
export class DateRangeInputDirective implements OnInit, OnDestroy, ControlValueAccessor {
  @HostBinding('class.datetime') dateRangeClass = true;

  @Input() inlineDatePickerTarget: ElementRef | undefined;

  private datePickerInstance: flatpickr.Instance | undefined = undefined;
  private onChange: ((data: DateRange | null) => void) | undefined = undefined;
  private onTouched: (() => void) | undefined = undefined;
  private dateRange: DateRange | null = null;

  constructor(private elem: ElementRef) {}

  ngOnInit() {
    const containerElem = this.elem.nativeElement as HTMLInputElement;
    this.datePickerInstance = flatpickr(containerElem, {
      mode: 'range',
      locale: Thai,
      dateFormat: 'j M Y',
      inline: this.inlineDatePickerTarget ? true : false,
      appendTo: this.inlineDatePickerTarget ? this.inlineDatePickerTarget.nativeElement : undefined,
      onChange: dates => {
        if (dates.length !== 1) {
          this.onValueChange(dates);
        }
      },
      onClose: dates => {
        this.onValueChange(dates.length === 2 ? dates : []);
        if (this.onTouched) {
          this.onTouched();
        }
      }
    }) as flatpickr.Instance;

    this.updateDatePickerValue();
  }

  updateDatePickerValue() {
    if (!this.datePickerInstance) {
      return;
    }

    if (this.dateRange) {
      this.datePickerInstance.setDate([this.dateRange.start, this.dateRange.end]);
    } else {
      this.datePickerInstance.clear();
    }
  }

  onValueChange(dates: Date[]) {
    if (dates.length === 2) {
      const [start, end] = dates;
      this.dateRange = { start, end };
    } else {
      this.dateRange = null;
    }

    if (this.onChange) {
      this.onChange(this.dateRange);
    }
  }

  ngOnDestroy() {
    if (this.datePickerInstance) {
      this.datePickerInstance.destroy();
    }
  }

  // ControlValueAccessor hooks.

  writeValue(dateRange: DateRange | undefined | null) {
    if (dateRange) {
      this.dateRange = dateRange;
    } else {
      this.dateRange = null;
    }

    this.updateDatePickerValue();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
