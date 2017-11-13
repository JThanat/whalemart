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
import { of as observableOf } from 'rxjs/observable/of';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { SvgIconRegistry } from '../../core/icon/svg-icon-registry.service';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() key = '';

  private keySubject = new BehaviorSubject<string>('');
  private iconUpdater: Subscription;

  constructor(
    private svgIconRegistry: SvgIconRegistry,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    this.clearSvgElement();

    this.iconUpdater = this.keySubject.pipe(
      distinctUntilChanged(),
      tap(() => this.clearSvgElement()),
      switchMap(key => key ? this.svgIconRegistry.getSvgIcon(key) : observableOf(undefined))
    ).subscribe(svg => {
      if (svg) {
        this.appendSvgElement(svg);
      }
    });
  }

  ngOnDestroy() {
    this.iconUpdater.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const keyChange = changes.key;
    if (keyChange.isFirstChange() || keyChange.previousValue !== keyChange.currentValue) {
      this.keySubject.next(keyChange.currentValue);
    }
  }

  private appendSvgElement(svg: SVGSVGElement) {
    this.renderer.appendChild(this.el.nativeElement, svg.cloneNode(true));
  }

  private clearSvgElement() {
    const containerElem = this.el.nativeElement as HTMLElement;
    const childCount = containerElem.childNodes.length;
    for (let i = 0; i < childCount; i++) {
      this.renderer.removeChild(containerElem, containerElem.children[i]);
    }
  }
}
