import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

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

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    const location = TestBed.get(Location) as SpyLocation;
    location.setInitialPath('/search');

    const router = TestBed.get(Router) as Router;
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
