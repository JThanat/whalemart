import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FacebookRegisterCanActivateGuard } from './facebook-register-guards.service';
import { FacebookRegisterComponent } from './facebook-register.component';
import { RegisterComponent } from './register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'facebook',
    component: FacebookRegisterComponent,
    canActivate: [FacebookRegisterCanActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
