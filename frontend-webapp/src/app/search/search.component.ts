import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { of as observableOf } from 'rxjs/observable/of';
import {
  distinctUntilChanged,
  map,
  publishBehavior,
  switchMap
} from 'rxjs/operators';

interface Market {
  name: string;
}

interface MarketSearchResult {
  count: number;
  results: Market[];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResult: Observable<Market[] | undefined>;
  searchForm: FormGroup;
  queryString: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.queryString = this.route.queryParamMap.pipe(
      map(queryParam => queryParam.get('q') || ''),
      distinctUntilChanged()
    );

    this.searchResult = (this.queryString.pipe(
      switchMap(q => {
        if (q === '') {
          return observableOf(undefined);
        } else {
          return this.http.get<MarketSearchResult>('/api/market-feed/', {
            params: {
              search: q
            }
          }).pipe(map(result => result.results));
        }
      }),
      publishBehavior(undefined)
      // TODO: Remove casting when https://github.com/ReactiveX/rxjs/issues/2972 is closed.
    ) as ConnectableObservable<Market[] | undefined>).refCount();
  }
}
