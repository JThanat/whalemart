import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AlertModule } from './alert/alert.module';
import { FooterComponent } from './footer/footer.component';
import { IconModule } from './icon/icon.module';
import { LocalDbModule } from './local-db/local-db.module';
import { MarketService } from './market/market.service';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { SearchBackButtonService } from './search/search-back-button.service';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    SharedModule,
    LocalDbModule,
    AlertModule,
    IconModule,
    NavBarModule
  ],
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent,
    AlertModule,
    IconModule,
    NavBarModule
  ],
  providers: [
    UserService,
    MarketService,
    SearchBackButtonService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentCoreModule: CoreModule) {
    if (parentCoreModule) {
      throw new Error('CoreModule can be imported once from AppModule.');
    }
  }
}
