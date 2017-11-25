import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { DateRange } from '../utils/date-range.service';

export interface Market {
  readonly id: number;
  readonly imageURL: string;
  readonly name: string;
  readonly location: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly minPrice: number;
  readonly expiryDays?: number;
  readonly reservedNo?: number;
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

export interface MarketServerResponse {
  id: number;
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
  expiry_time: number;
  reserved_no?: number;
}

export interface MarketSearchParams {
  page: number;
  query: string | undefined;
  dateRange: DateRange | undefined;
  time: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    night: boolean;
  };
  price: {
    min: number | undefined;
    max: number | undefined;
  };
  sortBy: 'createdTime' | 'openingDate';
}

const maxExpireDays = 90;

const searchResultItemsPerPage = 12;

export interface MarketSearchResult {
  currentPage: number;
  totalPage: number;
  markets: Market[];
}

@Injectable()
export class MarketService {
  constructor(private http: HttpClient) {}

  public getFeed(): Observable<MarketFeed> {
    return this.http.get<MarketFeedServerResponse>('/api/market-feed/').pipe(
      map(result => {
        return {
          recommended: result.recommend_market.map(market => this.normalizeMarket(market)),
          recentlyAdded: result.recently_added.map(market => this.normalizeMarket(market)),
          night: result.night_market.map(market => this.normalizeMarket(market)),
          winter: result.winter_market.map(market => this.normalizeMarket(market))
        };
      })
    );
  }

  public search(searchParams: MarketSearchParams): Observable<MarketSearchResult | undefined> {
    let hasSearchParams = false;
    let params = new HttpParams();

    if (searchParams.query !== undefined) {
      hasSearchParams = true;
      params = params.append('search', searchParams.query);
    }

    if (searchParams.dateRange) {
      hasSearchParams = true;
      params = params
        .append('min_date', searchParams.dateRange.start.toISOString())
        .append('max_date', searchParams.dateRange.end.toISOString());
    }

    const addTimeParams =
      searchParams.time.morning ||
      searchParams.time.afternoon ||
      searchParams.time.evening ||
      searchParams.time.night;

    if (addTimeParams) {
      hasSearchParams = true;
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

    if (searchParams.price.min !== undefined) {
      hasSearchParams = true;
      params = params.append('min_price', String(searchParams.price.min));
    }
    if (searchParams.price.max !== undefined) {
      hasSearchParams = true;
      params = params.append('max_price', String(searchParams.price.max));
    }

    if (!hasSearchParams) {
      return observableOf(undefined);
    }

    if (searchParams.sortBy === 'createdTime') {
      params = params.append('sort_by', 'created_at');
    } else if (searchParams.sortBy === 'openingDate') {
      params = params.append('sort_by', 'opening_date');
    }

    params = params.append('page', String(searchParams.page));

    return this.http
      .get<MarketSearchServerResponse>('/api/market-search/', {
        params
      })
      .pipe(
        map(result => {
          return {
            currentPage: searchParams.page,
            totalPage: Math.ceil(result.count / searchResultItemsPerPage),
            markets: result.results.map(serverMarket => this.normalizeMarket(serverMarket))
          };
        })
      );
  }

  normalizeMarket(serverMarket: MarketServerResponse): Market {
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const expiryDays = Math.ceil(serverMarket.expiry_time / millisecondsInDay);

    return {
      id: serverMarket.id,
      name: serverMarket.name,
      location: serverMarket.location,
      startDate: new Date(serverMarket.opening_date),
      endDate: new Date(serverMarket.closing_date),
      minPrice: Number(serverMarket.min_price),
      imageURL: serverMarket.cover_photo.thumbnail,
      expiryDays: expiryDays <= maxExpireDays && expiryDays > 0 ? expiryDays : undefined,
      reservedNo: serverMarket.reserved_no
    };
  }
}
