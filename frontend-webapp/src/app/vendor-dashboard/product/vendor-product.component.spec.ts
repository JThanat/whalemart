import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorProductComponent } from './vendor-product.component';

describe('VendorProductComponent', () => {
  let component: VendorProductComponent;
  let fixture: ComponentFixture<VendorProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
