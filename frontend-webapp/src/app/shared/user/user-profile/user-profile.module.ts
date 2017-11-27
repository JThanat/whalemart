import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { VendorProfileService } from '../../../core/vendor/vendor-profile.service';
import { InputModule } from '../../input/input.module';
import { LessorFormComponent } from '../lessor-form/lessor-form.component';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [
    InputModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserProfileComponent,
    LessorFormComponent
  ],
  exports: [
    UserProfileComponent,
    LessorFormComponent
  ],
  providers: [
    VendorProfileService
  ]
})
export class UserProfileModule { }
