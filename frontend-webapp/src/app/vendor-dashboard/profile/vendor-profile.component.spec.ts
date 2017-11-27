import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf } from 'rxjs/observable/of';

import { AlertService } from '../../core/alert/alert.service';
import { VendorProfileService } from '../../core/vendor/vendor-profile.service';
import { VendorProfileComponent } from './vendor-profile.component';

describe('VendorProfileComponent', () => {
  let component: VendorProfileComponent;
  let fixture: ComponentFixture<VendorProfileComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [VendorProfileComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: VendorProfileService, useValue: {} },
          { provide: AlertService, useValue: {} },
          {
            provide: ActivatedRoute,
            useValue: {
              data: observableOf({
                vendorProfile: {
                  email: 'a@b.com'
                }
              })
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
