import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';

import { AlertService } from '../core/alert/alert.service';
import { UserService } from '../core/user/user.service';
import { BecomeLessorComponent } from './become-lessor.component';
import { BecomeLessorService, LessorStatus } from './become-lessor.service';

export class MockBecomeLessorService {
  checkLessorStatus(): Observable<LessorStatus> {
    return observableOf('is_lessor' as LessorStatus);
  }
  becomeLessor(lessorParams: any): Observable<boolean> { return observableOf(true); }
}

describe('BecomeLessorComponent', () => {
  let component: BecomeLessorComponent;
  let fixture: ComponentFixture<BecomeLessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BecomeLessorComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: BecomeLessorService, useClass: MockBecomeLessorService },
        { provide: AlertService, useValue: {} },
        { provide: UserService, useValue: {} },
        { provide: ActivatedRoute, useValue: {} }
      ]
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
