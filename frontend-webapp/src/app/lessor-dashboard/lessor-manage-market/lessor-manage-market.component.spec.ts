import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf } from 'rxjs/observable/of';

import { LessorManageMarketComponent } from './lessor-manage-market.component';

describe('LessorManageMarketComponent', () => {
  let component: LessorManageMarketComponent;
  let fixture: ComponentFixture<LessorManageMarketComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LessorManageMarketComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: observableOf([]) }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LessorManageMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
