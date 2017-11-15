import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Alert, AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('alertInOut', [
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('250ms cubic-bezier(0.215, 0.61, 0.355, 1)')
      ]),
      transition(':leave', [
        animate(
          '250ms cubic-bezier(0.215, 0.61, 0.355, 1)',
          style({ opacity: 0, transform: 'translateY(-100%)' })
        )
      ])
    ]),
    trigger('backdropInOut', [
      state('*', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250)
      ]),
      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit {
  alert: Observable<Alert | undefined>;
  alerts: Observable<Alert[]>;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alert = this.alertService.getAlert();
    this.alerts = this.alert.pipe(map(alert => alert ? [alert] : []));
  }

  closeAlert() {
    this.alertService.close();
  }
}
