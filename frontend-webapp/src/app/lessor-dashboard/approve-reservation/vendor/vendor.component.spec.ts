import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorComponent } from './vendor.component';

describe('VendorComponent', () => {
  let component: VendorComponent;
  let fixture: ComponentFixture<VendorComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [VendorComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.vendor = {
      id: 1,
      firstName: 'f',
      lastName: 's',
      shopName: 'shopee',
      products: []
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
