import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';

import { DateRange } from '../../core/utils/date-range.service';
import { TimeService } from '../../core/utils/time.service';

interface CreateMarketParams {
  name: string;
  caption: string;
  description: string;
  dateRange: DateRange;
  openingTime: Date;
  closingTime: Date;
  contactPersonFullname: string;
  contactPersonPhoneNumber: string;
  contactPersonEmail: string;
  location: string;
  locationLatLng: {
    latitude: number;
    longitude: number;
  };
  termsAndCondition: string;
  depositPaymentDue: Date;
  fullPaymentDue: Date;
  reservationDue: Date;
  estimateVisitor: number;
  layoutPhoto: File;
  providedAccessories: {
    name: string;
    amount: string;
  }[];
  coverPhoto: File;
  scenePhotos: FileList;
  tags: string[];
  booths: {
    name: string;
    price: string;
  }[];
}

@Injectable()
export class CreateMarketService {
  constructor(private http: HttpClient, private timeService: TimeService) {}

  createMarket(params: CreateMarketParams) {
    const formData = new FormData();
    formData.append('name', params.name);
    formData.append('caption', params.caption);
    formData.append('description', params.description);
    formData.append('opening_date', params.dateRange.start.toISOString());
    formData.append('closing_date', params.dateRange.end.toISOString());
    formData.append('opening_time', this.timeService.convertToString(params.openingTime));
    formData.append('closing_time', this.timeService.convertToString(params.closingTime));
    formData.append('contact_person_fullname', params.contactPersonFullname);
    formData.append('contact_person_phone_number', params.contactPersonPhoneNumber);
    formData.append('contact_person_email', params.contactPersonEmail);
    formData.append('location', params.location);
    formData.append('location_latitude', String(params.locationLatLng.latitude));
    formData.append('location_longitude', String(params.locationLatLng.longitude));
    formData.append('term_and_condition', params.termsAndCondition);
    formData.append('deposit_payment_due', params.depositPaymentDue.toISOString());
    formData.append('full_payment_due', params.fullPaymentDue.toISOString());
    formData.append('reservation_due_date', params.reservationDue.toISOString());
    formData.append('estimate_visitor', String(params.estimateVisitor));
    formData.append('layout_photo', params.layoutPhoto);
    const providedAccessories = {} as { [name: string]: number };
    for (const accessory of params.providedAccessories) {
      providedAccessories[accessory.name] = Number(accessory.amount);
    }
    formData.append('provided_accessories', JSON.stringify(providedAccessories));
    formData.append('cover_photo.image', params.coverPhoto);
    for (let i = 0; i < params.scenePhotos.length; i++) {
      formData.append('scene_photo_list', params.scenePhotos[i]);
    }
    for (let i = 0; i < params.tags.length; i++) {
      formData.append(`tag_list-${i + 1}`, params.tags[i]);
    }
    for (let i = 0; i < params.booths.length; i++) {
      formData.append(`booth_list-${i + 1}.${params.booths[i].name}`, params.booths[i].price);
    }

    return this.http.post<{ id: number }>('/api/markets/', formData).pipe(
      map(result => result.id)
      // TODO: Handle error
    );
  }

  normalizeTags(tagString: string): string[] {
    return tagString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
  }

  tagsValidators: ValidatorFn = (formControl: AbstractControl) => {
    const tags = this.normalizeTags(formControl.value as string);

    if (tags.length === 0) {
      return { tags: true };
    }
    return null;
  };
}
