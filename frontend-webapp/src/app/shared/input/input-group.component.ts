import { AfterContentInit, Component, ContentChild, Input } from '@angular/core';

import { InputDirective } from './input.directive';

@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss']
})
export class InputGroupComponent implements AfterContentInit {
  static currentId = 0;

  @ContentChild(InputDirective) appInput: InputDirective;
  @Input() label = '';
  inputId = `appInput${InputGroupComponent.getNextId()}`;

  static getNextId() {
    InputGroupComponent.currentId++;
    return InputGroupComponent.currentId;
  }

  ngAfterContentInit() {
    this.appInput.inputId = this.inputId;
  }

  get showErrors() {
    // Show errors when the appInput indicates error.
    return this.appInput.isInvalid;
  }
}
