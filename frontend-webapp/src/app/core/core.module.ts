import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LocalDbModule } from './local-db/local-db.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    SharedModule,
    LocalDbModule
  ],
  declarations: [
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ],
  providers: [
    UserService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentCoreModule: CoreModule) {
    if (parentCoreModule) {
      throw new Error('CoreModule can be imported once from AppModule.');
    }
  }
}
