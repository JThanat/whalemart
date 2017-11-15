import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: Date[], args?: any): string | null {
    const startDate: Date = value[0];
    const endDate: Date = value[1];

    const startDay: number = startDate.getDay();
    const endDay: number = endDate.getDay();
    const startMonth: number = startDate.getMonth();
    const endMonth: number = endDate.getMonth();
    const startYear: number = startDate.getFullYear();
    const endYear: number = startDate.getFullYear();

    const endStr: string | null = this.datePipe.transform(endDate, 'd LLLL y', '', 'th');

    let startStr: string | null = this.datePipe.transform(startDate, 'd', '', 'th');
    if (startYear !== endYear) {
      startStr = this.datePipe.transform(startDate, 'd LLLL y', '', 'th');
    } else if (startMonth !== endMonth) {
      startStr = this.datePipe.transform(startDate, 'd LLLL', '', 'th');
    } else if (startDay === endDay) {
      return endStr;
    }

    return startStr + ' – ' + endStr;
  }

}
