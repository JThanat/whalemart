import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface UserInfo {
  username: string;
}

@Injectable()
export class UserService {
  readonly userInfo = new BehaviorSubject<UserInfo | undefined>(undefined);
}
