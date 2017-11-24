import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsLessorGuardService } from './is-lessor-guard.service';
import {LessorDashboardComponent} from './lessor-dashboard.component';
import { LessorManageMarketComponent } from './lessor-manage-market/lessor-manage-market.component';
import { LessorInfoComponent } from './lessor-info/lessor-info.component';
import { LessorMarketResolverService } from './lessor-manage-market/lessor-market-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: LessorDashboardComponent,
    canActivate: [IsLessorGuardService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage'
      },
      {
        path: 'manage',
        component: LessorManageMarketComponent,
        resolve: {
          markets: LessorMarketResolverService
        }
      },
      {
        path: 'profile',
        component: LessorInfoComponent
        // resolve: {
        //   vendorProfile: VendorProfileResolver
        // }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [IsLessorGuardService]
})
export class LessorDashboardRoutingModule { }
