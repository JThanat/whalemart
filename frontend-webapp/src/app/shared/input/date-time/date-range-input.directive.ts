import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as flatpickr from 'flatpickr';
import { BaseDateTimeInputDirective } from './base-date-time-input.directive';

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
export class DateRangeInputDirective extends BaseDateTimeInputDirective<DateRange> {
  protected getAdditionalDatePickerInstanceOptions(): flatpickr.Options.Options {
    return {
      mode: 'range'
    };
  }

  protected getDatePickerValue(dates: Date[]): DateRange | null {
    if (dates.length === 2) {
      return {
        start: dates[0],
        end: dates[1]
      };
    }
    return null;
  }

  protected updateDatePickerValue(value: DateRange | null): void {
    if (value) {
      this.setDatePickerValue([value.start, value.end]);
    } else {
      this.clearDatePickerValue();
    }
  }
}
