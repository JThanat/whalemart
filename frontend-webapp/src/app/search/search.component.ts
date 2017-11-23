import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { combineLatest as observableCombineLatest } from 'rxjs/observable/combineLatest';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import {
  Market,
  MarketSearchParams,
  MarketSearchResult,
  MarketService
} from '../core/market/market.service';
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

interface SearchFilterFormValue {
  time: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    night: boolean;
  };
  dateRange: DateRange | null;
  price: {
    min: string;
    max: string;
  };
}

const enum SortByMethod {
  CreatedTime = 'createdTime',
  OpeningTime = 'openingDate'
}

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
export class SearchComponent implements OnInit, OnDestroy {
  searchResult: Observable<SearchResult>;
  searchFilterForm: FormGroup;
  currentPage: Observable<number>;
  private routeParamsUpdater: Subscription;

  marketTrackByFn: TrackByFunction<Market> = (_, market) => market.id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marketService: MarketService,
    private searchBackButtonService: SearchBackButtonService,
    private dateRangeService: DateRangeService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.pipe(first()).subscribe(queryParamMap => {
      this.searchFilterForm = new FormGroup({
        time: new FormGroup({
          morning: new FormControl(queryParamMap.get('morning') === 'true'),
          afternoon: new FormControl(queryParamMap.get('afternoon') === 'true'),
          evening: new FormControl(queryParamMap.get('evening') === 'true'),
          night: new FormControl(queryParamMap.get('night') === 'true')
        }),
        dateRange: new FormControl(
          this.dateRangeService.deserialize(queryParamMap.get('daterange'))
        ),
        price: new FormGroup({
          min: new FormControl(this.deserializePrice(queryParamMap.get('minprice')) || '', [
            Validators.pattern(/^\d+$/)
          ]),
          max: new FormControl(this.deserializePrice(queryParamMap.get('maxprice')) || '', [
            Validators.pattern(/^\d+$/)
          ])
        })
      });
    });

    this.routeParamsUpdater = this.searchFilterForm.valueChanges
      .pipe(
        startWith({}),
        filter(() => this.searchFilterForm.valid),
        debounceTime(300),
        map(() => this.searchFilterForm.value as SearchFilterFormValue)
      )
      .subscribe(v => this.updateSearchRouteParams(v));

    this.currentPage = this.route.queryParamMap.pipe(
      map(queryParam => queryParam.get('page')),
      distinctUntilChanged(),
      map(pageStr => (pageStr === null ? 1 : Math.max(1, Number(pageStr))))
    );

    this.searchResult = this.getSearchParams().pipe(
      switchMap(searchParams => this.marketService.search(searchParams)),
      this.mapSearchResult(),
      startWith({ status: SearchResultStatus.Searching } as SearchResult)
    );
  }

  ngOnDestroy() {
    this.routeParamsUpdater.unsubscribe();
  }

  private updateSearchRouteParams(form: SearchFilterFormValue) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: null,
        daterange: form.dateRange ? this.dateRangeService.serialize(form.dateRange) : undefined,
        // Time
        morning: form.time.morning ? true : undefined,
        afternoon: form.time.afternoon ? true : undefined,
        evening: form.time.evening ? true : undefined,
        night: form.time.night ? true : undefined,
        // Price
        minprice: form.price.min || undefined,
        maxprice: form.price.max || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  private getSearchParams(): Observable<MarketSearchParams> {
    return observableCombineLatest(
      this.currentPage,
      this.route.queryParamMap,
      (page, queryParamMap) => {
        const queryStr = queryParamMap.get('q');
        const query = queryStr !== null && queryStr !== '' ? queryStr : undefined;

        const dateRangeStr = queryParamMap.get('daterange');
        const dateRange =
          dateRangeStr === null ? undefined : this.dateRangeService.deserialize(dateRangeStr);

        const morning = queryParamMap.get('morning') ? true : false;
        const afternoon = queryParamMap.get('afternoon') ? true : false;
        const evening = queryParamMap.get('evening') ? true : false;
        const night = queryParamMap.get('night') ? true : false;

        const minPrice = this.deserializePrice(queryParamMap.get('minprice'));
        const maxPrice = this.deserializePrice(queryParamMap.get('maxprice'));

        const sortBy = this.deserializeSortBy(queryParamMap.get('sortby'));

        return {
          page,
          query,
          dateRange,
          time: {
            morning,
            afternoon,
            evening,
            night
          },
          price: {
            min: minPrice,
            max: maxPrice
          },
          sortBy
        };
      }
    );
  }

  private deserializePrice(priceStr: string | null) {
    if (priceStr === null) {
      return undefined;
    }
    if (priceStr === '') {
      return undefined;
    }
    const price = Number(priceStr);
    if (!Number.isInteger(price) || price <= 0) {
      return undefined;
    }
    return price;
  }

  private deserializeSortBy(sortByStr: string | null) {
    if (sortByStr === 'created_time') {
      return SortByMethod.CreatedTime;
    } else if (sortByStr === 'opening_time') {
      return SortByMethod.OpeningTime;
    } else {
      return SortByMethod.CreatedTime;
    }
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

  setSorting(sortingMethod: SortByMethod) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        sortby: sortingMethod === SortByMethod.CreatedTime ? 'created_time' : 'opening_time'
      }
    });
  }

  goToSearchPage(page: number) {
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
