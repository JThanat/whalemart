import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { RegisterError, RegisterService } from './register.service';

describe('RegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RegisterService
      ]
    });
  });

  afterEach(inject(
    [HttpTestingController], (httpMock: HttpTestingController) => httpMock.verify()
  ));

  const inj = (fn: (
    registerService: RegisterService,
    httpMock: HttpTestingController
  ) => void) => inject([RegisterService, HttpTestingController], fn);

  describe('registration', () => {
    const registerParamsSample = {
      email: 'test@abc.com',
      firstName: 'Whalemart',
      lastName: 'Market',
      password: 'testpassword',
      phone: '0812345678'
    };

    it('should be able to register', inj((registerService, httpMock) => {
      let isOK = true;

      registerService.register(registerParamsSample).subscribe(result => {
        expect(result).toBe(true);
        isOK = true;
      });

      const req = httpMock.expectOne({ url: '/api/register/', method: 'POST' });
      expect(req.request.body).toEqual({
        email: 'test@abc.com',
        first_name: 'Whalemart',
        last_name: 'Market',
        password: 'testpassword',
        phone: '0812345678'
      });
      req.flush(null, { status: 201, statusText: 'Created' });

      expect(isOK).toBe(true);
    }));

    it('should throw RegisterError when the register information is not correct', inj(
      (registerService, httpMock) => {
        let isError = true;

        registerService.register(registerParamsSample).subscribe(() => fail(), err => {
          expect(err instanceof RegisterError).toBe(true);
          isError = true;
        });

        const req = httpMock.expectOne({ url: '/api/register/', method: 'POST' });
        req.flush({
          success: false,
          reason: 'INVALID'
        }, { status: 400, statusText: 'Bad Request' });

        expect(isError).toBe(true);
      })
    );

    it('should throw RegisterError when there is an HTTP error', inj(
      (registerService, httpMock) => {
        let isError = false;

        registerService.register(registerParamsSample).subscribe(() => fail(), err => {
          expect(err instanceof HttpErrorResponse).toBe(true);
          isError = true;
        });

        const req = httpMock.expectOne({ url: '/api/register/', method: 'POST' });
        req.error(new ErrorEvent('some error'));

        expect(isError).toBe(true);
      }
    ));
  });

  describe('email async validator', () => {
    const createMockControl = (value: string) => ({ value }) as any;

    it('should return null if the email is valid', inj((registerService, httpMock) => {
      let validated = false;

      registerService.emailValidator(createMockControl('abcde@test.com')).subscribe(result => {
        expect(result).toBeNull();
        validated = true;
      });

      const req = httpMock.expectOne({ method: 'GET' });
      expect(req.request.url).toBe('/api/validate-email/');
      expect(req.request.params.get('email')).toEqual('abcde@test.com');
      req.flush({ is_ok: true });

      expect(validated).toBe(true);
    }));

    it('should return form error if the email is duplicated', inj((registerService, httpMock) => {
      let validated = false;

      registerService.emailValidator(createMockControl('f@test.com')).subscribe(result => {
        expect(result).toEqual({ emailDuplicate: true });
        validated = true;
      });

      const req = httpMock.expectOne({ method: 'GET' });
      expect(req.request.url).toBe('/api/validate-email/');
      expect(req.request.params.get('email')).toEqual('f@test.com');
      req.flush({ is_ok: false });

      expect(validated).toBe(true);
    }));
  });
});
