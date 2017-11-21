import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivationStart,
  ChildActivationStart,
  RouteConfigLoadStart,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '../alert/alert.service';
import { UserService, UserStatus } from '../user/user.service';
import { SubNavBarService } from './sub-nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  isMenuOpened = false;

  /**
   * A name of a logged-in user that will be displayed on the top. If a user is not logged in, it
   * will be undefined.
   */
  userStatus: Observable<UserStatus>;

  private routerSubcription: Subscription;

  constructor(
    private userService: UserService,
    private alert: AlertService,
    private router: Router,
    private subNavBarService: SubNavBarService
  ) { }

  ngOnInit() {
    this.userStatus = this.userService.getUserStatus();

    this.routerSubcription = this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart ||
        event instanceof ChildActivationStart ||
        event instanceof ActivationStart) {
        this.isMenuOpened = false;
      }
    });
  }

  getSubNavBarPortal() {
    return this.subNavBarService.getAttachingSubNavBarPortal();
  }

  ngOnDestroy() {
    this.routerSubcription.unsubscribe();
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  logout() {
    this.isMenuOpened = false;
    this.userService.logout().subscribe(() => {
      this.alert.show({ message: `ออกจากระบบสำเร็จ`, type: 'success' });
    }, err => {
      // TODO: Handle error
      console.error(err);
    });
  }

  isShowNavBarSearchBox() {
    return this.router.url !== '/';
  }
}
