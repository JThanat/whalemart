import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { environment } from '../../../environments/environment';

export interface MarketDetail {
  name: string;
  caption: string;
  description: string;
  openingDate: Date;
  closingDate: Date;
  openingTime: string;
  closingTime: string;
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
  providedAccessories: string;
  coverImageUrl: string;
  scenePhotos: any[];
  tags: any[];
  booths: any[];
}

@Component({
  selector: 'app-market-landing',
  templateUrl: './market-landing.component.html',
  styleUrls: ['./market-landing.component.scss']
})
export class MarketLandingComponent implements OnInit {
  marketDetailObs: Observable<MarketDetail>;

  constructor(private route: ActivatedRoute, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.marketDetailObs = this.route.data.pipe(map(data => data.marketDetail));
  }

  getMapIframeUrl(location: MarketDetail['location']) {
    const url = `https://www.google.com/maps/embed/v1/place?key=${environment.google.apiKey}&q=` +
      encodeURIComponent(`${location.latitude},${location.longitude}`);
    console.log(url);
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
