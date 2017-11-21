import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VendorProfileRoutingModule } from './vendor-profile-routing.module';
import { VendorProfileComponent } from './vendor-profile.component';

@NgModule({
  imports: [
    SharedModule,
    VendorProfileRoutingModule
  ],
  declarations: [VendorProfileComponent]
})
export class VendorProfileModule { }
