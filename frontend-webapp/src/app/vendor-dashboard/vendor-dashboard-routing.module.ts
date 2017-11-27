import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorProfileResolver } from '../core/vendor/vendor-profile-resolver.service';
import { VendorPaymentResolver } from './payment/vendor-payment-resolver.service';
import { VendorPaymentComponent } from './payment/vendor-payment.component';
import { VendorProfileComponent } from './profile/vendor-profile.component';
import { VendorDashboardComponent } from './vendor-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: VendorDashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
      },
      {
        path: 'profile',
        component: VendorProfileComponent,
        resolve: {
          vendorProfile: VendorProfileResolver
        }
      },
      {
        path: 'payment',
        component: VendorPaymentComponent,
        resolve: {
          creditCards: VendorPaymentResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDashboardRoutingModule { }
