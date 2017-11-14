import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

type AlertType = 'info' | 'success' | 'warning' | 'danger';

export interface Alert {
  readonly message: string;
  readonly type: AlertType;
}

@Injectable()
export class AlertService {
  private alert = new BehaviorSubject<Alert | undefined>(undefined);

  show(alert: Alert) {
    this.alert.next(alert);
  }

  close() {
    this.alert.next(undefined);
  }

  getAlert() {
    return this.alert.asObservable();
  }
}
