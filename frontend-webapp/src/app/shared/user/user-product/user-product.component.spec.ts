import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs/observable/of';

import { AlertService } from '../../../core/alert/alert.service';
import { UserProductComponent } from './user-product.component';
import { UserProductService } from './user-product.service';

describe('UserProductComponent', () => {
  let component: UserProductComponent;
  let fixture: ComponentFixture<UserProductComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UserProductComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: UserProductService,
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
    fixture = TestBed.createComponent(UserProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
