import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessorInfoComponent } from './lessor-info.component';

describe('LessorInfoComponent', () => {
  let component: LessorInfoComponent;
  let fixture: ComponentFixture<LessorInfoComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LessorInfoComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LessorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
