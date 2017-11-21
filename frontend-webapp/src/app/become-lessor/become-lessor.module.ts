import { NgModule } from '@angular/core';

import { UserGuard } from '../shared/guard/user-guard';
import { SharedModule } from '../shared/shared.module';
import { BecomeLessorResolver } from './become-lessor-resolver.service';
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
    BecomeLessorService,
    UserGuard,
    BecomeLessorResolver
  ]
})
export class BecomeLessorModule { }
