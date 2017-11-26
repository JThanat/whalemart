import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketReserveBoothComponent } from './market-reserve-booth.component';

describe('MarketReserveBoothComponent', () => {
  let component: MarketReserveBoothComponent;
  let fixture: ComponentFixture<MarketReserveBoothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketReserveBoothComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketReserveBoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
