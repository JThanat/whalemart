import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class MarketReserveBoothService {
  boothsDuplicateValidator: ValidatorFn = (c: AbstractControl) => {
    const boothsId = (c.value as string[]).filter(boothId => boothId !== '');

    for (let i = 0; i < boothsId.length; i++) {
      for (let j = i + 1; j < boothsId.length; j++) {
        if (boothsId[i] === boothsId[j]) {
          return {
            boothsDuplicate: true
          };
        }
      }
    }

    return null;
  };
}
