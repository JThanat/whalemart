import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorProfileComponent } from './profile/vendor-profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VendorProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDashboardRoutingModule { }
