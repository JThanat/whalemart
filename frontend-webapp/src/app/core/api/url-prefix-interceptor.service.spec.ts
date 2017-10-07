import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { API_URL_PREFIX, UrlPrefixInterceptor } from './url-prefix-interceptor.service';

describe('UrlPrefixInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: API_URL_PREFIX, useValue: 'https://testurl:8000/api' },
        { provide: HTTP_INTERCEPTORS, useClass: UrlPrefixInterceptor, multi: true }
      ]
    });
  });

  it('should put a correct prefix to the request', inject(
    [HttpTestingController, HttpClient], (httpMock: HttpTestingController, http: HttpClient) => {
      let isSuccess = false;
      http.get<{ msg: string }>('/test/api', {
        headers: { 'X-Custom-Header': 'test' }
      }).subscribe(data => {
        expect(data.msg).toBe('success');
        isSuccess = true;
      });

      const req = httpMock.expectOne({
        url: 'https://testurl:8000/api/test/api',
        method: 'GET'
      });
      expect(req.request.headers.get('X-Custom-Header')).toBe('test');

      req.flush({ msg: 'success' });

      expect(isSuccess).toBe(true);
      httpMock.verify();
    }
  ));
});
