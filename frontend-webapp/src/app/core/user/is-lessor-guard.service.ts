import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { AlertService } from '../alert/alert.service';
import { UserService, UserStatusType } from './user.service';

@Injectable()
export class IsLessorGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private alert: AlertService
  ) {}

  canActivate() {
    return this.userService.getKnownUserStatus().pipe(
      map(userStatus => userStatus.type === UserStatusType.LoggedIn && userStatus.user.isLessor),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.alert.show({ message: 'กรุณาสมัครเป็นผู้ให้เช่าตลาดก่อน', type: 'warning' });
          this.router.navigate(['become-lessor']);
        }
      })
    );
  }
}
