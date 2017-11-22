import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LessorDashboardRoutingModule } from './lessor-dashboard-routing.module';
import { LessorDashboardComponent } from './lessor-dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    LessorDashboardRoutingModule
  ],
  declarations: [LessorDashboardComponent]
})
export class LessorDashboardModule { }
