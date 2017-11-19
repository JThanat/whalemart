import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BecomeLessorRoutingModule } from './become-lessor-routing.module';
import { BecomeLessorComponent } from './become-lessor.component';
import { BecomeLessorService } from './become-lessor.service';

@NgModule({
  imports: [
    SharedModule,
    BecomeLessorRoutingModule
  ],
  declarations: [BecomeLessorComponent],
  providers: [
    BecomeLessorService
  ]
})
export class BecomeLessorModule { }
