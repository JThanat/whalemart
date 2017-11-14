import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketLandingComponent } from './market-landing.component';

describe('MarketLandingComponent', () => {
  let component: MarketLandingComponent;
  let fixture: ComponentFixture<MarketLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
