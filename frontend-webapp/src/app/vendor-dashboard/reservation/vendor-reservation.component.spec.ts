import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs/observable/of';

import { VendorReservationComponent } from './vendor-reservation.component';
import { VendorReservationService } from './vendor-reservation.service';

fdescribe('VendorReservationComponent', () => {
  let component: VendorReservationComponent;
  let fixture: ComponentFixture<VendorReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VendorReservationComponent],
      providers: [
        {
          provide: VendorReservationService,
          useValue: {
            reservationInformation$: () => observableOf([])
          }
        }
      ]
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
