import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFileInputComponent } from './base-file-input.component';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileInputComponent,
      multi: true
    }
  ]
})
export class FileInputComponent extends BaseFileInputComponent {
  @Input() title: string;
  @Input() allowMultipleFiles = false;
}
