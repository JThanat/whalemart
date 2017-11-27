import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs/observable/of';

import { AlertService } from '../../core/alert/alert.service';
import { VendorProductComponent } from './vendor-product.component';
import { VendorProductService } from './vendor-product.service';

describe('VendorProductComponent', () => {
  let component: VendorProductComponent;
  let fixture: ComponentFixture<VendorProductComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [VendorProductComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: VendorProductService,
            useValue: {
              getProducts$: observableOf([])
            }
          },
          { provide: AlertService, useValue: {} }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
