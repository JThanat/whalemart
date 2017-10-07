import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiModule } from './api/api.module';

@NgModule({
  imports: [
    CommonModule,
    ApiModule
  ],
  declarations: [],
  exports: [
    ApiModule
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentCoreModule: CoreModule) {
    if (parentCoreModule) {
      throw new Error('CoreModule can be imported once from AppModule.');
    }
  }
}
