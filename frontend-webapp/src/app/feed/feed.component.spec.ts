import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs/observable/of';

import { Market, MarketFeed } from '../core/market/market.service';
import { FeedComponent } from './feed.component';

const testMarket: Market = {
  imageURL: 'https://url',
  expireDay: 3,
  name: 'foo',
  startDate: new Date(),
  endDate: new Date(),
  location: 'bar',
  minPrice: 1200
};

const testMarketFeed: MarketFeed = {
  recommendations: [testMarket, testMarket],
  nights: [testMarket, testMarket, testMarket, testMarket],
  days: [testMarket, testMarket, testMarket, testMarket]
};

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule, RouterTestingModule],
      declarations: [FeedComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            data: observableOf({ marketFeed: testMarketFeed })
          }
        }
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
