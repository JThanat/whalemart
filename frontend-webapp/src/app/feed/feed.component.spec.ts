import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs/observable/of';

import { Market, MarketFeed } from '../core/market/market.service';
import { DateRangeService } from '../core/utils/date-range.service';
import { FeedComponent } from './feed.component';

const testMarket: Market = {
  id: 1,
  imageURL: 'https://url',
  expiryDays: 3,
  reservedNo: 150,
  name: 'foo',
  startDate: new Date(),
  endDate: new Date(),
  location: 'bar',
  minPrice: 1200
};

const testMarketFeed: MarketFeed = {
  recommended: [testMarket, testMarket],
  recentlyAdded: [testMarket, testMarket, testMarket, testMarket],
  night: [testMarket, testMarket, testMarket, testMarket],
  winter: [testMarket, testMarket, testMarket, testMarket]
};

@Pipe({ name: 'dateRange' })
export class MockDateRangePipe implements PipeTransform {
  transform(value: Date[], ...args: any[]): any {
    return value.map(date => date.toISOString()).join(',');
  }
}

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule, RouterTestingModule],
      declarations: [FeedComponent, MockDateRangePipe],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            data: observableOf({ marketFeed: testMarketFeed })
          }
        },
        DateRangeService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
