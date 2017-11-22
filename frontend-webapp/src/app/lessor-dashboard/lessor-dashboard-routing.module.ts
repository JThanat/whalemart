import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsLessorGuardService } from './is-lessor-guard.service';
import {LessorDashboardComponent} from './lessor-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: LessorDashboardComponent,
    canActivate: [IsLessorGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [IsLessorGuardService]
})
export class LessorDashboardRoutingModule { }
