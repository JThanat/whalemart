import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PingRoutingModule } from './ping-routing.module';
import { PingComponent } from './ping.component';

@NgModule({
  imports: [
    SharedModule,
    PingRoutingModule
  ],
  declarations: [PingComponent]
})
export class PingModule { }
