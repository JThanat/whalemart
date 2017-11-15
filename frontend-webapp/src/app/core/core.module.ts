import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AlertModule } from './alert/alert.module';
import { FooterComponent } from './footer/footer.component';
import { IconModule } from './icon/icon.module';
import { LocalDbModule } from './local-db/local-db.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    SharedModule,
    LocalDbModule,
    AlertModule,
    IconModule
  ],
  declarations: [
    NavBarComponent,
    FooterComponent
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    AlertModule,
    IconModule
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
