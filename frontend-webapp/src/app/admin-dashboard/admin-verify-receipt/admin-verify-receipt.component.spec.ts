import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs/observable/of';

import { AdminVerifyReceiptComponent } from './admin-verify-receipt.component';
import { ReceiptService } from './receipt.service';

class MockReceiptService {
  getReceiptList() {
    return observableOf([]);
  }
}

describe('AdminVerifyReceiptComponent', () => {
  let component: AdminVerifyReceiptComponent;
  let fixture: ComponentFixture<AdminVerifyReceiptComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AdminVerifyReceiptComponent],
        providers: [{ provide: ReceiptService, useClass: MockReceiptService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVerifyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
