import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard'
})
export class CreditCardPipe implements PipeTransform {

  transform(value: string, args?: string): string {
    try {
      const dividedCardNumber: string[] = [];
      for (let i = 0; i < value.length; i += 4) {
        dividedCardNumber.push(value.substring(i, i + 4));
      }
      if (args === 'hide' && dividedCardNumber.length) {
        dividedCardNumber[dividedCardNumber.length - 1] = 'XXXX';
      }
      return dividedCardNumber.join('-');
    } catch (e) {
      return value;
    }
  }

}
