import { animate, state, style, transition, trigger } from '@angular/animations';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal, TemplatePortalDirective } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menuInOut', [
      state('*', style({ opacity: 1, transform: 'scale(1, 1) translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.75, 0.75) translateY(-1rem)' }),
        animate('150ms cubic-bezier(0.215, 0.61, 0.355, 1)')
      ]),
      transition(':leave', [
        animate(
          '150ms cubic-bezier(0.215, 0.61, 0.355, 1)',
          style({ opacity: 0, transform: 'scale(0.75, 0.75) translateY(-1rem)' })
        )
      ])
    ])
  ]
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() text = '';
  @Input() clearBackdrop = true;
  @Input() right = false;
  @ViewChild(TemplatePortalDirective) menuPortal: TemplatePortal<any>;
  @ViewChild('menuBtn') menuBtn: ElementRef;

  private menuOverlay: OverlayRef;

  constructor(private overlay: Overlay, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    const config = new OverlayConfig({
      // panelClass: 'menu-content',
      positionStrategy: this.overlay.position().connectedTo(
        this.menuBtn,
        { originX: this.right ? 'end' : 'start', originY: 'bottom' },
        { overlayX: this.right ? 'end' : 'start', overlayY: 'top' }
      ),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true,
      backdropClass: this.clearBackdrop ? 'clear-backdrop' : undefined
    });

    this.menuOverlay = this.overlay.create(config);
  }

  openMenu() {
    this.menuOverlay.attach(this.menuPortal);
    this.menuOverlay.backdropClick().subscribe(() => {
      this.menuOverlay.detach();
      this.cd.markForCheck();
    });
  }

  closeMenu() {
    this.menuOverlay.detach();
    this.cd.markForCheck();
  }

  ngOnDestroy() {
    if (this.menuOverlay.hasAttached()) {
      this.menuOverlay.detach();
    }
    this.menuOverlay.dispose();
  }

  isOpening() {
    return this.menuOverlay.hasAttached();
  }
}
