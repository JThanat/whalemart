import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
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

interface MarketFeedServerResponse {
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
  page: number;
  query?: string;
  dateRange?: DateRange;
  time?: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    night: boolean;
  };
}

const minShowExpireTimespanInDays = 90;

// TODO: Change this to 12.
const searchResultItemsPerPage = 10;

export interface MarketSearchResult {
  currentPage: number;
  totalPage: number;
  markets: Market[];
}

@Injectable()
export class MarketService {
  constructor(private http: HttpClient) { }

  public getFeed() {
    // TODO: Use categorized markets feed data from server.
    return this.http.get<MarketFeedServerResponse>('/api/market-feed/').pipe(
      map(result => result.results.map(serverMarket => this.transformResponse(serverMarket))),
      map(markets => this.transformToMarketsFeed(markets))
    );
  }

  public search(searchParams: SearchParams): Observable<MarketSearchResult | undefined> {
    let hasSearchParams = false;
    let params = new HttpParams();

    if (searchParams.query !== undefined) {
      hasSearchParams = true;
      params = params.append('search', searchParams.query);
    }

    if (searchParams.dateRange !== undefined) {
      hasSearchParams = true;
      params = params
        .append('min_date', searchParams.dateRange.start.toISOString())
        .append('max_date', searchParams.dateRange.end.toISOString());
    }

    if (searchParams.time !== undefined) {
      const addTimeParams =
        searchParams.time.morning ||
        searchParams.time.afternoon ||
        searchParams.time.evening ||
        searchParams.time.night;

      if (addTimeParams) {
        if (searchParams.time.morning) {
          params = params.append('morning', 'true');
        }
        if (searchParams.time.afternoon) {
          params = params.append('afternoon', 'true');
        }
        if (searchParams.time.evening) {
          params = params.append('evening', 'true');
        }
        if (searchParams.time.night) {
          params = params.append('night', 'true');
        }
      }
    }

    if (!hasSearchParams) {
      return observableOf(undefined);
    }

    return this.http.get<MarketFeedServerResponse>('/api/market-search/', {
      params: params.append('page', String(searchParams.page))
    }).pipe(map(result => {
      return {
        currentPage: searchParams.page,
        totalPage: Math.ceil(result.count / searchResultItemsPerPage),
        markets: result.results.map(
          serverMarket => this.transformResponse(serverMarket)
        )
      };
    }));
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
      imageURL: serverMarket.cover_photo.thumbnail
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
