import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as flatpickr from 'flatpickr';

import { BaseDateTimeInputDirective } from './base-date-time-input.directive';

@Directive({
  selector: '[appTimeInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TimeInputDirective,
      multi: true
    }
  ]
})
export class TimeInputDirective extends BaseDateTimeInputDirective<Date> {
  protected getAdditionalDatePickerInstanceOptions(): flatpickr.Options.Options {
    return {
      enableTime: true,
      noCalendar: true,
      time_24hr: true,
      dateFormat: 'H:i'
    };
  }

  protected getDatePickerValue(dates: Date[]): Date | null {
    if (dates.length === 1) {
      return dates[0];
    }
    return null;
  }

  protected updateDatePickerValue(value: Date | null): void {
    if (value) {
      this.setDatePickerValue([value]);
    } else {
      this.clearDatePickerValue();
    }
  }
}
