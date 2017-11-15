import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { of as observableOf } from 'rxjs/observable/of';
import {
  distinctUntilChanged,
  map,
  publishReplay,
  switchMap
} from 'rxjs/operators';

import { Market, MarketService } from '../core/market/market.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('marketInOut', [
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10%)' }),
        animate('200ms cubic-bezier(0.215, 0.61, 0.355, 1)')
      ]),
      transition(':leave', [
        animate(
          '200ms cubic-bezier(0.215, 0.61, 0.355, 1)',
          style({ opacity: 0, transform: 'translateY(-10%)' })
        )
      ])
    ])
  ]
})
export class SearchComponent implements OnInit {
  searchResult: Observable<Market[] | undefined>;
  searchForm: FormGroup;
  queryString: Observable<string>;
  marketTrackByFn: TrackByFunction<Market> = (_, market) => market.name;

  constructor(
    private route: ActivatedRoute,
    private marketService: MarketService
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
          return this.marketService.search({ query: q });
        }
      }),
      publishReplay(1)
      // TODO: Remove casting when https://github.com/ReactiveX/rxjs/issues/2972 is closed.
    ) as ConnectableObservable<Market[] | undefined>).refCount();
  }
}
