import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsLessorGuard } from '../core/user/is-lessor-guard.service';
import { VendorProfileResolver } from '../core/vendor/vendor-profile-resolver.service';
import { CreateMarketComponent } from './create-market/create-market.component';
import { LessorDashboardComponent } from './lessor-dashboard.component';
import { LessorInfoComponent } from './lessor-info/lessor-info.component';
import { LessorManageMarketComponent } from './manage-market/lessor-manage-market.component';
import { LessorMarketResolverService } from './manage-market/lessor-market-resolver.service';
import { PaymentStatusComponent } from './payment-status/payment-status.component';

const routes: Routes = [
  {
    path: '',
    component: LessorDashboardComponent,
    canActivate: [IsLessorGuard],
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
        path: 'payment-status',
        component: PaymentStatusComponent
      },
      {
        path: 'create-market',
        component: CreateMarketComponent
      },
      {
        path: 'approve',
        loadChildren: './approve-reservation/approve-reservation.module#ApproveReservationModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessorDashboardRoutingModule {}
