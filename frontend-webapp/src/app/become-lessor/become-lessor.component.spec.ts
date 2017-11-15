import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeLessorComponent } from './become-lessor.component';

describe('BecomeLessorComponent', () => {
  let component: BecomeLessorComponent;
  let fixture: ComponentFixture<BecomeLessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeLessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeLessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
