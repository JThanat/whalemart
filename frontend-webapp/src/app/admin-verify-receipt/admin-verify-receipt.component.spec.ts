import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVerifyReceiptComponent } from './admin-verify-receipt.component';

describe('AdminVerifyReceiptComponent', () => {
  let component: AdminVerifyReceiptComponent;
  let fixture: ComponentFixture<AdminVerifyReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVerifyReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVerifyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
