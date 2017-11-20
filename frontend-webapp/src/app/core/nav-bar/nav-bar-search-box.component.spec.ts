import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { DateRangeService } from '../utils/date-range.service';
import { NavBarSearchBoxComponent } from './nav-bar-search-box.component';

describe('NavBarSearchBoxComponent', () => {
  let component: NavBarSearchBoxComponent;
  let fixture: ComponentFixture<NavBarSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [NavBarSearchBoxComponent],
      providers: [DateRangeService]
    }).compileComponents();
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
