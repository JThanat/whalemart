import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorProfileResolver } from '../core/vendor/vendor-profile-resolver.service';
import { CreateMarketComponent } from './create-market/create-market.component';
import { IsLessorGuardService } from './is-lessor-guard.service';
import { LessorDashboardComponent } from './lessor-dashboard.component';
import { LessorInfoComponent } from './lessor-info/lessor-info.component';
import { LessorManageMarketComponent } from './manage-market/lessor-manage-market.component';
import { LessorMarketResolverService } from './manage-market/lessor-market-resolver.service';

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
        component: LessorInfoComponent,
        resolve: {
          vendorProfile: VendorProfileResolver
        }
      },
      {
        path: 'create-market',
        component: CreateMarketComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [IsLessorGuardService]
})
export class LessorDashboardRoutingModule {}
