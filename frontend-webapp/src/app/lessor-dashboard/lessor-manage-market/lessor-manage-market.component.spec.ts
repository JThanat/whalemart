import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LessorManageMarketComponent } from './lessor-manage-market.component';

describe('LessorManageMarketComponent', () => {
  let component: LessorManageMarketComponent;
  let fixture: ComponentFixture<LessorManageMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessorManageMarketComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessorManageMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
