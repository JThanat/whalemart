import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserGuard } from '../shared/guard/user-guard';
import { BecomeLessorComponent } from './become-lessor.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BecomeLessorComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecomeLessorRoutingModule { }
