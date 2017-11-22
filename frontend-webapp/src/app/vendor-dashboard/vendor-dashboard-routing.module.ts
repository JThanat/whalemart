import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        component: VendorProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDashboardRoutingModule { }
