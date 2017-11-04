import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentCoreModule: CoreModule) {
    if (parentCoreModule) {
      throw new Error('CoreModule can be imported once from AppModule.');
    }
  }
}
