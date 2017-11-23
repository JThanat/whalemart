import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private previousUrl = '';
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const newUrlTree = this.router.parseUrl(event.url);
        newUrlTree.fragment = '';

        const previousUrl = this.router.parseUrl(this.previousUrl);
        previousUrl.fragment = '';

        if (this.router.serializeUrl(newUrlTree) !== this.router.serializeUrl(previousUrl)) {
          window.scroll(0, 0);
        }

        this.previousUrl = event.url;
      }
    });
  }
}
