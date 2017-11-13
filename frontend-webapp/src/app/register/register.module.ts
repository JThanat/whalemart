import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FacebookRegisterCanActivateGuard } from './facebook-register-guards.service';
import { FacebookRegisterComponent } from './facebook-register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';

@NgModule({
  imports: [
    SharedModule,
    RegisterRoutingModule
  ],
  declarations: [
    RegisterComponent,
    FacebookRegisterComponent
  ],
  providers: [
    RegisterService,
    FacebookRegisterCanActivateGuard
  ]
})
export class RegisterModule { }
