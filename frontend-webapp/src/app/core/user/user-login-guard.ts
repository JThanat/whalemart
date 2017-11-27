import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { AlertService } from '../alert/alert.service';
import { UserService, UserStatusType } from './user.service';

@Injectable()
export class UserLoginGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private alert: AlertService
  ) { }

  canActivate() {
    return this.userService.getKnownUserStatus().pipe(
      map(userStatus => userStatus.type === UserStatusType.LoggedIn),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.alert.show({ message: 'กรุณาเข้าสู่ระบบก่อน', type: 'warning' });
          this.router.navigate(['login']);
        }
      })
    );
  }
}
