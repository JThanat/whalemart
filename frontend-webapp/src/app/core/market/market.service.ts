import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  readonly recommendations: Market[];
  readonly nights: Market[];
  readonly days: Market[];
}

interface MarketSearchResult {
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

  public getFeed() {
    // TODO: Use categorized markets feed data from server.
    return this.http.get<MarketSearchResult>('/api/market-feed/').pipe(
      map(result => result.results.map(serverMarket => this.transformResponse(serverMarket))),
      map(markets => this.transformToMarketsFeed(markets))
    );
  }

  public search(searchParams: SearchParams) {
    let params = new HttpParams().append('search', searchParams.query);
    if (searchParams.dateRange) {
      params = params
        .append('min_date', searchParams.dateRange.start.toISOString())
        .append('max_date', searchParams.dateRange.end.toISOString());
    }

    return this.http.get<MarketSearchResult>('/api/market-feed/', { params })
      .pipe(map(result => result.results.map(
        serverMarket => this.transformResponse(serverMarket)
      )));
  }

  private transformResponse(serverMarket: MarketServerResponse): Market {
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
      imageURL: serverMarket.cover_photo.thumbnail.replace('4200', '8000')
    };
  }

  private transformToMarketsFeed(markets: Market[]): MarketFeed {
    if (markets.length === 0) {
      throw new Error('No market. Please run loaddata first');
    }

    const m = (index: number) => markets[index % markets.length];

    return {
      recommendations: [m(0), m(1)],
      days: [m(2), m(3), m(4), m(5)],
      nights: [m(6), m(7), m(8), m(9)]
    };
  }
}
