import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketComponent } from './market.component';

@Pipe({
  name: 'dateRange'
})
export class MockDateRangePipe implements PipeTransform {
  transform(value: Date[], ...args: any[]) {
    return value.map(date => date.toUTCString());
  }
}

describe('MarketComponent', () => {
  let component: MarketComponent;
  let fixture: ComponentFixture<MarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [
        MarketComponent,
        MockDateRangePipe
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
