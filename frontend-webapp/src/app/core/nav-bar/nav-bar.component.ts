import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { UserService } from '../user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isMenuOpened = false;
  userName: Observable<string | undefined>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userName = this.userService.userInfo.pipe(
      map(userInfo => userInfo ? userInfo.email : undefined)
    );
  }

  logout() {
    this.userService.userInfo.next(undefined);
  }
}
