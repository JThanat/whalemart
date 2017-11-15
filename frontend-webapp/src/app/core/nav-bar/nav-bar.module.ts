import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { NavBarSearchBoxComponent } from './nav-bar-search-box.component';
import { NavBarComponent } from './nav-bar.component';
import { SubNavBarService } from './sub-nav-bar.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NavBarComponent,
    NavBarSearchBoxComponent
  ],
  exports: [
    NavBarComponent
  ],
  providers: [SubNavBarService]
})
export class NavBarModule { }
