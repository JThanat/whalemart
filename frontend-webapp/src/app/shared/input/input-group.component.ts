import { animate, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, ContentChild, Input } from '@angular/core';

import { InputDirective } from './input.directive';

@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  animations: [
    trigger('errorInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-10px)' }),
        animate(100, style({ transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate(100, style({ transform: 'translateY(-10px)' }))
      ])
    ])
  ]
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
