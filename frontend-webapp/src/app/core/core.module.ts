import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [],
  exports: []
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentCoreModule: CoreModule) {
    if (parentCoreModule) {
      throw new Error('CoreModule can be imported once from AppModule.');
    }
  }
}
