import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';

@NgModule({
  imports: [SharedModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
  providers: [AlertService]
})
export class AlertModule { }
