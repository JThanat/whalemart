import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs/observable/of';

import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../core/alert/alert.service';
import { VendorPaymentComponent } from './vendor-payment.component';
import { VendorPaymentService } from './vendor-payment.service';

@Pipe({ name: 'creditCard' })
export class MockCreditCardPipe implements PipeTransform {
  transform(value: string, ...args: any[]) {
    return value;
  }
}

describe('VendorPaymentComponent', () => {
  let component: VendorPaymentComponent;
  let fixture: ComponentFixture<VendorPaymentComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [VendorPaymentComponent, MockCreditCardPipe],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: VendorPaymentService,
            useValue: {}
          },
          { provide: AlertService, useValue: {} },
          {
            provide: ActivatedRoute,
            useValue: {
              data: observableOf({
                creditCards: []
              })
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
