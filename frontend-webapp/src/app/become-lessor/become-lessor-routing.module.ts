import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginGuard } from '../core/user/user-login-guard';
import { BecomeLessorResolver } from './become-lessor-resolver.service';
import { BecomeLessorComponent } from './become-lessor.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BecomeLessorComponent,
    canActivate: [UserLoginGuard],
    resolve: {
      lessorStatus: BecomeLessorResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecomeLessorRoutingModule { }
