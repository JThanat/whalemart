import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
  animations: [
    trigger('inOut', [
      state('in', style({transform: 'translateY(0)'})),
      transition(':enter', [
        style({transform: 'translateY(-10px)'}),
        animate(100)
      ]),
      transition(':leave', [
        animate(100, style({transform: 'translateY(-10px)'}))
      ])
    ])
  ]
})
export class InputErrorComponent { }
