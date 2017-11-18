import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest as observableCombineLatest } from 'rxjs/observable/combineLatest';
import { of as observableOf } from 'rxjs/observable/of';
import { switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { SvgIconRegistry } from '../../core/icon/svg-icon-registry.service';

type Sizing = number | string | null | undefined;

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() key = '';
  @Input() width: Sizing = undefined;
  @Input() height: Sizing = undefined;

  private keySubject = new BehaviorSubject<string>('');
  private widthSubject = new BehaviorSubject<Sizing>(undefined);
  private heightSubject = new BehaviorSubject<Sizing>(undefined);
  private initialSvgSize = new BehaviorSubject<{
    width: string | null;
    height: string | null;
  }>({ width: null, height: null });

  private svgElement: SVGSVGElement | undefined;
  private iconUpdater: Subscription;
  private iconSizeUpdater: Subscription;

  constructor(
    private svgIconRegistry: SvgIconRegistry,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    this.clearSvgElement();

    this.iconUpdater = this.keySubject.pipe(
      tap(() => this.clearSvgElement()),
      switchMap(key => key ? this.svgIconRegistry.getSvgIcon(key) : observableOf(undefined))
    ).subscribe(svg => {
      if (svg) {
        this.appendSvgElement(svg);
        this.initialSvgSize.next({
          width: svg.getAttribute('width'),
          height: svg.getAttribute('height')
        });
      }
    });

    this.iconSizeUpdater = observableCombineLatest(
      this.initialSvgSize,
      this.widthSubject,
      this.heightSubject
    ).subscribe(([initial, preferedWidth, preferedHeight]) => {
      if (!this.svgElement) {
        return;
      }

      if (preferedWidth == null && preferedHeight == null) {
        this.setSvgSize(initial.width, initial.height);
      } else {
        this.setSvgSize(
          preferedWidth ? String(preferedWidth) : null,
          preferedHeight ? String(preferedHeight) : null
        );
      }
    });
  }

  ngOnDestroy() {
    this.iconUpdater.unsubscribe();
    this.iconSizeUpdater.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const keyChange = changes.key;
    if (keyChange && (keyChange.isFirstChange()
      || keyChange.previousValue !== keyChange.currentValue)) {
      this.keySubject.next(keyChange.currentValue);
    }

    const widthChange = changes.width;
    if (widthChange && (widthChange.isFirstChange()
      || widthChange.previousValue !== widthChange.currentValue)) {
      this.widthSubject.next(widthChange.currentValue);
    }

    const heightChange = changes.height;
    if (heightChange && (heightChange.isFirstChange()
      || heightChange.previousValue !== heightChange.currentValue)) {
      this.heightSubject.next(heightChange.currentValue);
    }
  }

  private appendSvgElement(svg: SVGSVGElement) {
    this.svgElement = svg.cloneNode(true) as SVGSVGElement;
    this.renderer.appendChild(this.el.nativeElement, this.svgElement);
  }

  private clearSvgElement() {
    const containerElem = this.el.nativeElement as HTMLElement;
    const childCount = containerElem.childNodes.length;
    for (let i = 0; i < childCount; i++) {
      this.renderer.removeChild(containerElem, containerElem.children[i]);
    }
    this.svgElement = undefined;
  }

  private setSvgSize(width: string | null, height: string | null) {
    if (!this.svgElement) {
      return;
    }

    if (width === null) {
      this.renderer.removeAttribute(this.svgElement, 'width');
    } else {
      this.renderer.setAttribute(this.svgElement, 'width', width);
    }

    if (height === null) {
      this.renderer.removeAttribute(this.svgElement, 'height');
    } else {
      this.renderer.setAttribute(this.svgElement, 'height', height);
    }
  }
}
