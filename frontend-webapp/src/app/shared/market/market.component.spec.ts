import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Market } from '../../core/market/market.service';
import { MarketComponent } from './market.component';

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

@Pipe({ name: 'dateRange' })
export class MockDateRangePipe implements PipeTransform {
  transform(value: Date[], ...args: any[]) {
    return value.map(date => date.toUTCString()).join(',');
  }
}

describe('MarketComponent', () => {
  let component: MarketComponent;
  let fixture: ComponentFixture<MarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        MarketComponent,
        MockDateRangePipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketComponent);
    component = fixture.componentInstance;
    component.market = testMarket;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
