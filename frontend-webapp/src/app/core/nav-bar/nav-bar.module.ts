import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { NavBarComponent } from './nav-bar.component';
import { SubNavBarService } from './sub-nav-bar.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ],
  providers: [SubNavBarService]
})
export class NavBarModule { }
