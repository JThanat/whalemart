import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf } from 'rxjs/observable/of';
import { UploadReceiptComponent } from './upload-receipt.component';

describe('UploadReceiptComponent', () => {
  let component: UploadReceiptComponent;
  let fixture: ComponentFixture<UploadReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadReceiptComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            params: observableOf({})
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
