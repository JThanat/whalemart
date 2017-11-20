import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, TrackByFunction } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { combineLatest as observableCombineLatest } from 'rxjs/observable/combineLatest';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { Market, MarketSearchResult, MarketService } from '../core/market/market.service';
import { SearchBackButtonService } from '../core/search/search-back-button.service';
import { DateRange, DateRangeService } from '../core/utils/date-range.service';

const enum SearchResultStatus {
  OK = 'ok',
  Searching = 'searching',
  EmptySearchParams = 'emptySearchParams'
}

interface SearchResultOK extends MarketSearchResult {
  status: SearchResultStatus.OK;
}

interface SearchResultNotOK {
  status: SearchResultStatus.EmptySearchParams | SearchResultStatus.Searching;
}

type SearchResult = SearchResultOK | SearchResultNotOK;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('pageChangeAnim', [
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(3rem)' }),
        animate('200ms cubic-bezier(0.215, 0.61, 0.355, 1)')
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-3rem)' }),
        animate('200ms cubic-bezier(0.215, 0.61, 0.355, 1)')
      ])
    ]),
    trigger('marketInOut', [
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-1rem)' }),
        animate('200ms cubic-bezier(0.215, 0.61, 0.355, 1)')
      ])
    ])
  ]
})
export class SearchComponent implements OnInit {
  searchResult: Observable<SearchResult>;
  searchForm: FormGroup;
  queryString: Observable<string>;
  dateRange: Observable<DateRange | undefined>;
  currentPage: Observable<number>;

  marketTrackByFn: TrackByFunction<Market> = (_, market) => market.id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marketService: MarketService,
    private searchBackButtonService: SearchBackButtonService,
    private dateRangeService: DateRangeService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.queryString = this.route.queryParamMap.pipe(
      map(queryParam => queryParam.get('q') || ''),
      distinctUntilChanged()
    );

    this.dateRange = this.route.queryParamMap.pipe(
      map(queryParam => queryParam.get('daterange')),
      distinctUntilChanged(),
      map(dateRangeStr => {
        if (dateRangeStr) {
          return this.dateRangeService.deserialize(dateRangeStr);
        }
        return undefined;
      })
    );

    this.currentPage = this.route.queryParamMap.pipe(
      map(queryParam => queryParam.get('page')),
      distinctUntilChanged(),
      map(pageStr => {
        if (pageStr === null) {
          return 1;
        }
        const page = Number(pageStr);
        return (page >= 1) ? page : 1;
      })
    );

    const searchParams = observableCombineLatest(
      this.currentPage,
      this.queryString,
      this.dateRange
    );

    this.searchResult = searchParams.pipe(
      switchMap(([page, queryString, dateRange]) => {
        const query = queryString !== '' ? queryString : undefined;

        return this.marketService.search({
          page, query, dateRange
        }).pipe(this.mapSearchResult());
      }),
      startWith({ status: SearchResultStatus.Searching } as SearchResult)
    );
  }

  private mapSearchResult() {
    return map((result: MarketSearchResult | undefined): SearchResult => {
      if (result === undefined) {
        return {
          status: SearchResultStatus.EmptySearchParams
        };
      } else {
        return {
          status: SearchResultStatus.OK,
          ...result
        };
      }
    });
  }

  goToSearchPage(page: number) {
    this.document.body.scrollTop = this.document.documentElement.scrollTop = 0;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: { page }
    });
  }

  canGoBack() {
    return this.searchBackButtonService.canGoBack();
  }

  goBack() {
    return this.searchBackButtonService.goBack();
  }
}
