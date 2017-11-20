import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {
  convertToDate(timeString: string): Date {
    const [hour, minute, second] = timeString.split(':');
    return new Date(0, 0, 0, Number(hour), Number(minute), Number(second));
  }
}
