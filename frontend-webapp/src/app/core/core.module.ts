import { NgModule } from '@angular/core';
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
export class CoreModule { }
