import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map } from 'rxjs/operators';

import { TimeService } from '../core/utils/time.service';

export interface MarketDetail {
  name: string;
  caption: string;
  description: string;
  openingDate: Date;
  closingDate: Date;
  openingTime: Date;
  closingTime: Date;
  contact: {
    fullname: string;
    phoneNumber: string;
    email: string;
  };
  location: {
    name: string;
    latitude: string;
    longitude: string;
  };
  termsAndCondition: string;
  depositPaymentDue: Date;
  fullPaymentDue: Date;
  reservationDueDate: Date;
  estimateVisitor: number;
  minPrice: number;
  maxPrice: number;
  layoutImageUrl: string;
  providedAccessories: {
    name: string;
    amount: number;
  }[];
  coverImageUrl: string;
  scenePhotoUrls: string[];
  tags: string[];
}

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
  provided_accessories: {
    [name: string]: number;
  };
  cover_photo: {
    image: string;
  };
  scene_photo_list: {
    scene_image: string;
  }[];
  tag_list: string[];
}

@Injectable()
export class MarketDetailResolver implements Resolve<MarketDetail> {
  constructor(private http: HttpClient, private timeService: TimeService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const marketId = Number(route.params.id);
    return this.http.get<MarketDetailServerResponse>(`/api/markets/${marketId}/`).pipe(
      map(serverResponse => this.normalizeMarketDetail(serverResponse))
    );
  }

  private normalizeMarketDetail(sr: MarketDetailServerResponse): MarketDetail {
    const providedAccessories = Object.entries(sr.provided_accessories).map(accessory => {
      const [name, amount] = accessory;
      return { name, amount };
    });

    return {
      name: sr.name,
      caption: sr.caption,
      description: sr.description,
      openingDate: new Date(sr.opening_date),
      closingDate: new Date(sr.closing_date),
      openingTime: this.timeService.convertToDate(sr.opening_time),
      closingTime: this.timeService.convertToDate(sr.closing_time),
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
      layoutImageUrl: sr.layout_photo,
      providedAccessories: providedAccessories,
      coverImageUrl: sr.cover_photo.image,
      scenePhotoUrls: sr.scene_photo_list.map(photo => photo.scene_image),
      tags: sr.tag_list
    };
  }
}


