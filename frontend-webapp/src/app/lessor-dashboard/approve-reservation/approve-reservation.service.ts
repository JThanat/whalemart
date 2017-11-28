import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mapTo } from 'rxjs/operators';

interface ApproveReservationParams {
  marketId: number;
  boothVendorMap: Map<number, number>;
}

@Injectable()
export class ApproveReservationService {
  constructor(private http: HttpClient) {}

  approveReservation(params: ApproveReservationParams) {
    return this.http
      .post(
        '/api/approve-reservation/',
        {
          market: params.marketId,
          booths: Array.from(params.boothVendorMap.entries()).map(([boothId, vendorId]) => ({
            user: vendorId,
            id: boothId
          }))
        },
        { responseType: 'text' }
      )
      .pipe(mapTo(true));
  }
}
