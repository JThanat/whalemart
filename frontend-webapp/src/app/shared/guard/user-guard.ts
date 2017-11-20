import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UserService } from '../../core/user/user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private userService: UserService
  ) { }

  canActivate() {
    const userRespone = this.userService.getCurrentUserInfo();
    return !!userRespone;
  }
}
