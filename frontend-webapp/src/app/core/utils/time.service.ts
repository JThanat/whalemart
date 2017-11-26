import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {
  convertToDate(timeString: string): Date {
    const [hour, minute, second] = timeString.split(':');
    return new Date(0, 0, 0, Number(hour), Number(minute), Number(second));
  }

  convertToString(date: Date): string {
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    return `${hour}:${minute}:${second}`;
  }
}
