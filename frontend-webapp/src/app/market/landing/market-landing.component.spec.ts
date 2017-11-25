import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MarketLandingComponent } from './market-landing.component';

@Pipe({ name: 'dateRange' })
export class MockDateRangePipe implements PipeTransform {
  transform(value: Date[], ...args: any[]) {
    return value.map(date => date.toUTCString()).join(',');
  }
}

describe('MarketLandingComponent', () => {
  let component: MarketLandingComponent;
  let fixture: ComponentFixture<MarketLandingComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, ScrollDispatchModule],
        declarations: [MarketLandingComponent, MockDateRangePipe],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
