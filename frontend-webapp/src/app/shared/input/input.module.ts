import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateInputDirective } from './date-time/date-input.directive';
import { DateRangeInputDirective } from './date-time/date-range-input.directive';
import { TimeInputDirective } from './date-time/time-input.directive';
import { FileInputComponent } from './file/file-input.component';
import { InputErrorComponent } from './input-error.component';
import { InputGroupComponent } from './input-group.component';
import { InputDirective } from './input.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DateInputDirective,
    DateRangeInputDirective,
    TimeInputDirective,
    FileInputComponent,
    InputDirective,
    InputErrorComponent,
    InputGroupComponent
  ],
  exports: [
    DateInputDirective,
    DateRangeInputDirective,
    TimeInputDirective,
    FileInputComponent,
    FileInputComponent,
    InputDirective,
    InputErrorComponent,
    InputGroupComponent
  ]
})
export class InputModule {}
