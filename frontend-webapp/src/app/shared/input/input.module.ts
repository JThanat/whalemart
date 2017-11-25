import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateRangeInputDirective } from './date-time/date-range-input.directive';
import { FileInputComponent } from './file/file-input.component';
import { InputErrorComponent } from './input-error.component';
import { InputGroupComponent } from './input-group.component';
import { InputDirective } from './input.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    InputErrorComponent,
    InputGroupComponent,
    InputDirective,
    FileInputComponent,
    DateRangeInputDirective,
    FileInputComponent
  ],
  exports: [
    InputErrorComponent,
    InputGroupComponent,
    InputDirective,
    FileInputComponent,
    DateRangeInputDirective,
    FileInputComponent
  ]
})
export class InputModule {}
