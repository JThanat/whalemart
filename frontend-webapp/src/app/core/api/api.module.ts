import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { environment } from '../../../environments/environment';
import { API_URL_PREFIX, UrlPrefixInterceptor } from './url-prefix-interceptor.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlPrefixInterceptor, multi: true },
    { provide: API_URL_PREFIX, useValue: environment.apiUrlPrefix }
  ],
  exports: [
    HttpClientModule
  ]
})
export class ApiModule { }
