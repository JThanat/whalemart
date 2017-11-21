import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UserService } from './user.service';

@Injectable()
export class UserLoginGuard implements CanActivate {
  constructor(
    private userService: UserService
  ) { }

  canActivate() {
    const userRespone = this.userService.getCurrentUserInfo();
    return !!userRespone;
  }
}
