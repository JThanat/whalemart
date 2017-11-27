import { NgModule } from '@angular/core';

import { UserLoginGuard } from '../core/user/user-login-guard';
import { SharedModule } from '../shared/shared.module';
import { LessorFormComponent } from '../shared/user/lessor-form/lessor-form.component';
import { BecomeLessorResolver } from './become-lessor-resolver.service';
import { BecomeLessorRoutingModule } from './become-lessor-routing.module';
import { BecomeLessorComponent } from './become-lessor.component';
import { BecomeLessorService } from './become-lessor.service';

@NgModule({
  imports: [SharedModule, BecomeLessorRoutingModule],
  declarations: [BecomeLessorComponent, LessorFormComponent],
  providers: [BecomeLessorService, UserLoginGuard, BecomeLessorResolver],
  exports: [LessorFormComponent]
})
export class BecomeLessorModule {}
