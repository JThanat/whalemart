import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService } from '../../core/alert/alert.service';
import { MarketReserveBoothComponent } from './market-reserve-booth.component';
import { MarketReserveBoothService } from './market-reserve-booth.service';

class MockAlertService {}

class MockMarketReserveBoothService {
  boothsDuplicateValidator = () => null;
}

describe('MarketReserveBoothComponent', () => {
  let component: MarketReserveBoothComponent;
  let fixture: ComponentFixture<MarketReserveBoothComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [MarketReserveBoothComponent],
        providers: [
          { provide: AlertService, useClass: MockAlertService },
          { provide: MarketReserveBoothService, useClass: MockMarketReserveBoothService }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketReserveBoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
