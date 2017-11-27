import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { mapTo } from 'rxjs/operators/mapTo';

interface ReserveBoothParams {
  marketId: number;
  shopName: string;
  boothIds: number[];
  productIds: number[];
}

@Injectable()
export class MarketReserveBoothService {
  constructor(private http: HttpClient) {}

  reserveBooth(params: ReserveBoothParams) {
    return this.http
      .post('/api/reserve-booth/', {
        shop_name: params.shopName,
        market: params.marketId,
        reserved_booths: params.boothIds.map(boothId => ({ booth: boothId })),
        products: params.productIds
      })
      .pipe(mapTo(true));
  }

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
