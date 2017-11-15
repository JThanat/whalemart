import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarSearchBoxComponent } from './nav-bar-search-box.component';

describe('NavBarSearchBoxComponent', () => {
  let component: NavBarSearchBoxComponent;
  let fixture: ComponentFixture<NavBarSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarSearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
