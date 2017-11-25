import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessorDashboardComponent } from './lessor-dashboard.component';

describe('LessorDashboardComponent', () => {
  let component: LessorDashboardComponent;
  let fixture: ComponentFixture<LessorDashboardComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LessorDashboardComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LessorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
