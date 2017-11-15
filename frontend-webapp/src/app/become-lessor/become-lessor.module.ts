import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BecomeLessorRoutingModule } from './become-lessor-routing.module';
import { BecomeLessorComponent } from './become-lessor.component';

@NgModule({
  imports: [
    SharedModule,
    BecomeLessorRoutingModule
  ],
  declarations: [BecomeLessorComponent]
})
export class BecomeLessorModule { }
