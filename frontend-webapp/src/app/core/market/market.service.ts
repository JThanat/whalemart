import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { DateRange } from '../utils/date-range.service';

export interface Market {
  readonly id: number;
  readonly expireDay?: number;
  readonly imageURL: string;
  readonly name: string;
  readonly location: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly minPrice: number;
}

export interface MarketFeed {
  readonly recommended: Market[];
  readonly recentlyAdded: Market[];
  readonly night: Market[];
  readonly winter: Market[];
}

interface MarketFeedServerResponse {
  recommend_market: MarketServerResponse[];
  recently_added: MarketServerResponse[];
  night_market: MarketServerResponse[];
  winter_market: MarketServerResponse[];
}

interface MarketSearchServerResponse {
  count: number;
  results: MarketServerResponse[];
}

interface MarketServerResponse {
  name: string;
  caption: string;
  description: string;
  opening_date: string;
  closing_date: string;
  opening_time: string;
  closing_time: string;
  contact_person_fullname: string;
  location: string;
  reservation_due_date: string;
  min_price: string;
  max_price: string;
  cover_photo: {
    thumbnail: string;
  };
  tags: any[];
  id: number;
}

interface SearchParams {
  query: string;
  dateRange?: DateRange;
}

const minShowExpireTimespanInDays = 90;

@Injectable()
export class MarketService {
  constructor(private http: HttpClient) { }

  public getFeed(): Observable<MarketFeed> {
    return this.http.get<MarketFeedServerResponse>('/api/market-feed/').pipe(map(result => {
      return {
        recommended: result.recommend_market.map(market => this.normalizeMarket(market)),
        recentlyAdded: result.recently_added.map(market => this.normalizeMarket(market)),
        night: result.night_market.map(market => this.normalizeMarket(market)),
        winter: result.winter_market.map(market => this.normalizeMarket(market))
      };
    }));
  }

  public search(searchParams: SearchParams) {
    let params = new HttpParams().append('search', searchParams.query);
    if (searchParams.dateRange) {
      params = params
        .append('min_date', searchParams.dateRange.start.toISOString())
        .append('max_date', searchParams.dateRange.end.toISOString());
    }

    return this.http.get<MarketSearchServerResponse>('/api/market-search/', { params })
      .pipe(map(result => result.results.map(
        serverMarket => this.normalizeMarket(serverMarket)
      )));
  }

  private normalizeMarket(serverMarket: MarketServerResponse): Market {
    // TODO: Calculate expire day from server instead.
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const dueDate = new Date(serverMarket.reservation_due_date).getTime();
    const expireDay = Math.ceil((dueDate - Date.now()) / millisecondsInDay);

    return {
      id: serverMarket.id,
      name: serverMarket.name,
      location: serverMarket.location,
      startDate: new Date(serverMarket.opening_date),
      endDate: new Date(serverMarket.closing_date),
      minPrice: Number(serverMarket.min_price),
      expireDay: (0 < expireDay && expireDay <= minShowExpireTimespanInDays)
        ? expireDay : undefined,
      imageURL: serverMarket.cover_photo.thumbnail
    };
  }
}
