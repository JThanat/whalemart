import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService } from '../core/alert/alert.service';
import {
  IntercomponentDataMap,
  IntercomponentDataService
} from '../core/utils/intercomponent-data.service';
import { FacebookRegisterComponent } from './facebook-register.component';
import { RegisterService } from './register.service';

class MockAlertService { }

const testFbRegisterData: IntercomponentDataMap['fbRegister'] = {
  fbAccessToken: 'token',
  firstName: 'foo',
  lastName: 'bar',
  email: 'test@abc.com',
  profileImageUrl: 'http://fb.com/img/url'
};

describe('FacebookRegisterComponent', () => {
  let component: FacebookRegisterComponent;
  let fixture: ComponentFixture<FacebookRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [FacebookRegisterComponent],
      providers: [
        RegisterService,
        IntercomponentDataService,
        { provide: AlertService, useClass: MockAlertService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookRegisterComponent);
    component = fixture.componentInstance;
  });

  it('should get Facebook registration data from IntercomponentDataService', inject(
    [IntercomponentDataService],
    (intercomponentDataService: IntercomponentDataService) => {
      intercomponentDataService.set('fbRegister', testFbRegisterData);

      fixture.detectChanges();

      expect(component).toBeTruthy();
      expect(component.fbRegisterData).toBe(testFbRegisterData);
    })
  );
});
