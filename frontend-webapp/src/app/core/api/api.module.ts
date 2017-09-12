import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { API_URL_PREFIX, UrlPrefixInterceptor } from './url-prefix-interceptor.service';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlPrefixInterceptor, multi: true },
    { provide: UrlPrefixInterceptor, useValue: environment.apiUrlPrefix }
  ],
  exports: [
    HttpClientModule
  ]
})
export class ApiModule { }
