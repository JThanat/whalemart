import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LessorDashboardComponent} from './lessor-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: LessorDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessorDashboardRoutingModule { }
