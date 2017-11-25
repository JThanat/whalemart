import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Output() click = new EventEmitter();

  constructor(private menuComponent: MenuComponent) {}

  @HostListener('click')
  clickMenuItem() {
    this.menuComponent.closeMenu();
  }
}
