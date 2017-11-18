import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { IntercomponentDataService } from '../core/utils/intercomponent-data.service';

@Injectable()
export class FacebookRegisterCanActivateGuard implements CanActivate {
  constructor(private intercomponentDataService: IntercomponentDataService) { }

  canActivate() {
    return this.intercomponentDataService.has('fbRegister');
  }
}
