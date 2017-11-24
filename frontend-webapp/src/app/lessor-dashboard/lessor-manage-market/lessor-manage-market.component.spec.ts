import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessorManageMarketComponent } from './lessor-manage-market.component';

describe('LessorManageMarketComponent', () => {
  let component: LessorManageMarketComponent;
  let fixture: ComponentFixture<LessorManageMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessorManageMarketComponent ]
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
