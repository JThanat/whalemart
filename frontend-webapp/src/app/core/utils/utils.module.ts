import { NgModule } from '@angular/core';

import { DateRangeService } from './date-range.service';
import { IntercomponentDataService } from './intercomponent-data.service';
import { TimeService } from './time.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    TimeService,
    DateRangeService,
    IntercomponentDataService
  ]
})
export class UtilsModule { }
