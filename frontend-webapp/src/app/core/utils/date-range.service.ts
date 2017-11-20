import { Injectable } from '@angular/core';

export interface DateRange {
  readonly start: Date;
  readonly end: Date;
}

@Injectable()
export class DateRangeService {
  serialize(dateRange: DateRange) {
    const { start: s, end: e } = dateRange;
    const startStr = `${s.getFullYear()}-${s.getMonth() + 1}-${s.getDate()}`;
    const endStr = `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`;
    return `${startStr}/${endStr}`;
  }

  deserialize(dateRangeStr: string): DateRange | undefined {
    if (dateRangeStr === '') {
      return undefined;
    }

    try {
      const [startStr, endStr] = dateRangeStr.split('/');
      const [startYear, startMonth, startDate] = startStr.split('-');
      const [endYear, endMonth, endDate] = endStr.split('-');

      const start = new Date(
        Number(startYear),
        Number(startMonth) - 1,
        Number(startDate)
      );

      const end = new Date(
        Number(endYear),
        Number(endMonth) - 1,
        Number(endDate)
      );

      return { start, end };
    } catch (e) {
      return undefined;
    }
  }
}
