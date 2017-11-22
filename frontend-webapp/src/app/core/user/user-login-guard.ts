import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

import { UserService, UserStatusType } from './user.service';

@Injectable()
export class UserLoginGuard implements CanActivate {
  constructor(
    private userService: UserService
  ) { }

  canActivate() {
    return this.userService.getKnownUserStatus().pipe(
      map(userStatus => userStatus.type === UserStatusType.LoggedIn)
    );
  }
}
