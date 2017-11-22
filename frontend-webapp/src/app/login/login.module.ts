import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FacebookLoginService } from './facebook-login.service';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService,
    FacebookLoginService
  ]
})
export class LoginModule { }
