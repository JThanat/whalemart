import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessorFormComponent } from './lessor-form.component';

describe('LessorFormComponent', () => {
  let component: LessorFormComponent;
  let fixture: ComponentFixture<LessorFormComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LessorFormComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LessorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
