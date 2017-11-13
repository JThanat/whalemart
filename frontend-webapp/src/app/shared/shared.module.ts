import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputErrorComponent } from './input/input-error.component';
import { InputGroupComponent } from './input/input-group.component';
import { InputDirective } from './input/input.directive';
import { SvgIconComponent } from './svg-icon/svg-icon.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    InputGroupComponent,
    InputDirective,
    InputErrorComponent,
    SvgIconComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputGroupComponent,
    InputDirective,
    InputErrorComponent,
    SvgIconComponent
  ]
})
export class SharedModule { }
