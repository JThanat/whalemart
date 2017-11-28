import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { of as observableOf } from 'rxjs/observable/of';
import { PaymentStatusComponent } from './payment-status.component';

describe('PaymentStatusComponent', () => {
  let component: PaymentStatusComponent;
  let fixture: ComponentFixture<PaymentStatusComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PaymentStatusComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: observableOf({ paymentStatus: [] })
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
