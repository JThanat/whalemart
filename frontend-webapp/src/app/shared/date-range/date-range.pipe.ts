import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: Date[], args?: any): string | null {
    const [startDate, endDate] = value;

    const startDay: number = startDate.getDate();
    const endDay: number = endDate.getDate();
    const startMonth: number = startDate.getMonth();
    const endMonth: number = endDate.getMonth();
    const startYear: number = startDate.getFullYear();
    const endYear: number = startDate.getFullYear();

    const endStr: string | null = this.datePipe.transform(endDate, 'd LLLL y');

    let startStr: string | null;
    if (startYear !== endYear) {
      startStr = this.datePipe.transform(startDate, 'd LLLL y');
    } else if (startMonth !== endMonth) {
      startStr = this.datePipe.transform(startDate, 'd LLLL');
    } else if (startDay !== endDay) {
      startStr = this.datePipe.transform(startDate, 'd');
    } else {
      return endStr;
    }

    return `${startStr} – ${endStr}`;
  }
}
