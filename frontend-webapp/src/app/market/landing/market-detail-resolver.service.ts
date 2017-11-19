import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { map } from 'rxjs/operators/map';
import { MarketDetail } from './market-landing.component';

interface MarketDetailServerResponse {
  name: string;
  caption: string;
  description: string;
  opening_date: string;
  closing_date: string;
  opening_time: string;
  closing_time: string;
  contact_person_fullname: string;
  contact_person_phone_number: string;
  contact_person_email: string;
  location: string;
  location_latitude: string;
  location_longitude: string;
  term_and_condition: string;
  deposit_payment_due: string;
  full_payment_due: string;
  reservation_due_date: string;
  estimate_visitor: number;
  min_price: string;
  max_price: string;
  layout_photo: string;
  provided_accessories: string;
  cover_photo: {
    image: string;
  };
  scene_photos: any[];
  tags: any[];
  booths: any[];
}

@Injectable()
export class MarketDetailResolver implements Resolve<MarketDetail> {
  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot) {
    const marketId = Number(route.params.id);
    return this.http.get<MarketDetailServerResponse>(`/api/markets/${marketId}/`).pipe(
      map(serverResponse => this.normalizeMarketDetail(serverResponse))
    );
  }

  private normalizeMarketDetail(sr: MarketDetailServerResponse): MarketDetail {
    return {
      name: sr.name,
      caption: sr.caption,
      description: sr.description,
      openingDate: new Date(sr.opening_date),
      closingDate: new Date(sr.closing_date),
      openingTime: sr.opening_time,
      closingTime: sr.closing_time,
      contact: {
        fullname: sr.contact_person_fullname,
        phoneNumber: sr.contact_person_phone_number,
        email: sr.contact_person_email
      },
      location: {
        name: sr.location,
        latitude: sr.location_latitude,
        longitude: sr.location_longitude
      },
      termsAndCondition: sr.term_and_condition,
      depositPaymentDue: new Date(sr.deposit_payment_due),
      fullPaymentDue: new Date(sr.full_payment_due),
      reservationDueDate: new Date(sr.reservation_due_date),
      estimateVisitor: sr.estimate_visitor,
      minPrice: Number(sr.min_price),
      maxPrice: Number(sr.max_price),
      layoutImageUrl: sr.layout_photo.replace('4200', '8000'),
      providedAccessories: sr.provided_accessories,
      coverImageUrl: sr.cover_photo.image.replace('4200', '8000'),
      scenePhotos: sr.scene_photos,
      tags: sr.tags,
      booths: sr.booths
    };
  }
}


