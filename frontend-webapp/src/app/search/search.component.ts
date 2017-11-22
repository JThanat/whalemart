import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { combineLatest as observableCombineLatest } from 'rxjs/observable/combineLatest';
import { of as observableOf } from 'rxjs/observable/of';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { Market, MarketService } from '../core/market/market.service';
import { SearchBackButtonService } from '../core/search/search-back-button.service';
import { DateRange, DateRangeService } from '../core/utils/date-range.service';

const enum SearchResultStatus {
  OK = 'ok',
  Searching = 'searching',
  EmptyQuery = 'emptyQuery'
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('marketInOut', [
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-1rem)' }),
        animate('200ms cubic-bezier(0.215, 0.61, 0.355, 1)')
      ]),
      transition(':leave', [
        animate(
          '200ms cubic-bezier(0.215, 0.61, 0.355, 1)',
          style({ opacity: 0, transform: 'translateY(-1rem)' })
        )
      ])
    ])
  ]
})
export class SearchComponent implements OnInit {
  searchResult: Observable<{ status: SearchResultStatus, markets?: Market[] }>;
  searchForm: FormGroup;
  queryString: Observable<string>;
  dateRange: Observable<DateRange | undefined>;
  marketTrackByFn: TrackByFunction<Market> = (_, market) => market.name;

  constructor(
    private route: ActivatedRoute,
    private marketService: MarketService,
    private searchBackButtonService: SearchBackButtonService,
    private dateRangeService: DateRangeService
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

    const searchParams = observableCombineLatest(
      this.queryString,
      this.dateRange
    );

    this.searchResult = searchParams.pipe(
      switchMap(([query, dateRange]) => {
        if (query === '') {
          return observableOf({ status: SearchResultStatus.EmptyQuery });
        } else {
          return this.marketService.search({
            query,
            dateRange: dateRange
          }).pipe(map(markets => ({ status: SearchResultStatus.OK, markets })));
        }
      }),
      startWith({ status: SearchResultStatus.Searching })
    );
  }

  canGoBack() {
    return this.searchBackButtonService.canGoBack();
  }

  goBack() {
    return this.searchBackButtonService.goBack();
  }
}
