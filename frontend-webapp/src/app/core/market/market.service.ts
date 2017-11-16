import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface Market {
  expireDay?: number;
  imageURL: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  minPrice: number;
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
}

interface SearchParams {
  query: string;
}

const minShowExpireTimespanInDays = 90;

@Injectable()
export class MarketService {
  constructor(private http: HttpClient) { }

  public search(params: SearchParams) {
    return this.http.get<MarketSearchResult>('/api/market-feed/', {
      params: {
        search: params.query
      }
    }).pipe(map(result => result.results.map(
      serverMarket => this.transformResponse(serverMarket)
    )));
  }

  private transformResponse(serverMarket: MarketServerResponse): Market {
    // TODO: Calculate expire day from server instead.
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const dueDate = new Date(serverMarket.reservation_due_date).getTime();
    const expireDay = Math.ceil((dueDate - Date.now()) / millisecondsInDay);

    return {
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
}
