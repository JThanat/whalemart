import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { of as observableOf } from 'rxjs/observable/of';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  publishBehavior,
  switchMap
} from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

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
export class SearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  queryString: Observable<string>;
  searchResult: Observable<Market[] | undefined>;

  private queryParamUpdater: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.queryString = this.route.queryParamMap.pipe(
      map(queryParam => queryParam.get('q') || ''),
      distinctUntilChanged()
    );

    // Get the initial queryString
    this.queryString.pipe(first()).subscribe(q => {
      this.searchForm = new FormGroup({
        query: new FormControl(q)
      });
    });

    this.queryParamUpdater = this.searchForm.valueChanges.pipe(
      map(() => this.searchForm.value.query),
      debounceTime(300)
    ).subscribe(queryString => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          q: queryString
        },
        queryParamsHandling: 'merge'
      });
    });

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

  ngOnDestroy() {
    this.queryParamUpdater.unsubscribe();
  }
}
