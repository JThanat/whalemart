import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Output() click = new EventEmitter();

  constructor(private menuComponent: MenuComponent) {}

  ngOnInit() {
    this.menuComponent.closeMenu();
  }

  @HostListener('click')
  clickMenuItem() {
    this.menuComponent.closeMenu();
  }
}
