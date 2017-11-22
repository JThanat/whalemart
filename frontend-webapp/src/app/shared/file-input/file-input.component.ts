import { Component, OnInit } from '@angular/core';
import { BaseFileInputComponent } from './base-file-input.component';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent extends BaseFileInputComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  updateInputFile(event: any) {
    super.updateInputFile(event);
    console.log(this.fileList);
  }

}
