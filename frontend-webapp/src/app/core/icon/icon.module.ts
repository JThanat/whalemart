import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { SvgIconRegistry } from './svg-icon-registry.service';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    SvgIconRegistry
  ]
})
export class IconModule { }
