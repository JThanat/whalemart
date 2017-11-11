import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGroupComponent } from './input-group.component';
import { InputDirective } from './input.directive';

describe('InputGroupComponent', () => {
  let component: InputGroupComponent;
  let fixture: ComponentFixture<InputGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGroupComponent);
    component = fixture.componentInstance;
    component.appInput = new InputDirective(null as any, null as any, null as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
