import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorReservationComponent } from './vendor-reservation.component';

describe('VendorReservationComponent', () => {
  let component: VendorReservationComponent;
  let fixture: ComponentFixture<VendorReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
