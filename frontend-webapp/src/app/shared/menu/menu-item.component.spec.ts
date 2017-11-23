import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'app-menu'
})
class MockMenuComponent {}

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MenuItemComponent],
        providers: [{ provide: MenuComponent, useClass: MockMenuComponent }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
