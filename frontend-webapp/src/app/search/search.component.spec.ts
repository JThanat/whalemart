import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs/observable/of';

import { MarketService } from '../core/market/market.service';
import { SearchBackButtonService } from '../core/search/search-back-button.service';
import { DateRangeService } from '../core/utils/date-range.service';
import { SearchComponent } from './search.component';

class MockMarketService {
  search() {}
}

class MockSearchBackButtonService {}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([
            {
              path: 'search',
              component: SearchComponent
            }
          ])
        ],
        declarations: [SearchComponent],
        providers: [
          { provide: MarketService, useClass: MockMarketService },
          { provide: SearchBackButtonService, useClass: MockSearchBackButtonService },
          DateRangeService
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(
    fakeAsync(() => {
      fixture = TestBed.createComponent(SearchComponent);
      component = fixture.componentInstance;

      const location = TestBed.get(Location) as SpyLocation;
      location.setInitialPath('/search?q=foo');

      const router = TestBed.get(Router) as Router;
      router.initialNavigation();
      tick();
    })
  );

  const inj = (fn: (marketService: MockMarketService) => void) => inject([MarketService], fn);

  it(
    'should create',
    inj(marketService => {
      spyOn(marketService, 'search').and.returnValue(
        observableOf({
          currentPage: 1,
          totalPage: 0,
          markets: []
        })
      );

      fixture.detectChanges();
      expect(component).toBeTruthy();
    })
  );
});
