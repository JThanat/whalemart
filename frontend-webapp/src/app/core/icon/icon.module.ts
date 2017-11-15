import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { SharedModule } from '../../shared/shared.module';
import { SVG_ICON_DEFINITIONS, SvgIconRegistry } from './svg-icon-registry.service';

const svgIconNames = ['whalemart-logo-with-name'];

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    SvgIconRegistry,
    {
      provide: SVG_ICON_DEFINITIONS,
      useFactory: (domSanitizer: DomSanitizer) => svgIconNames.map(svgIconName => ({
        key: svgIconName,
        fileUrl: domSanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${svgIconName}.svg`)
      })),
      deps: [DomSanitizer]
    }
  ]
})
export class IconModule { }
