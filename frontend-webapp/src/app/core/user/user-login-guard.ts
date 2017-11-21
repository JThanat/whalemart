import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { first, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()
export class UserLoginGuard implements CanActivate {
  constructor(
    private userService: UserService
  ) { }

  canActivate() {
    return this.userService.userInfo.pipe(
      first(),
      map(userInfo => userInfo !== undefined)
    );
  }
}
