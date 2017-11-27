import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LessorFormComponent } from './lessor-form.component';

describe('LessorFormComponent', () => {
  let component: LessorFormComponent;
  let fixture: ComponentFixture<LessorFormComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        imports: [HttpClientTestingModule, ReactiveFormsModule],
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
