import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of as observableOf } from 'rxjs/observable/of';

import { SvgIconRegistry } from '../../core/icon/svg-icon-registry.service';
import { SvgIconComponent } from './svg-icon.component';

class MockSvgIconRegistry {
  getSvgIcon(key: string) {
    const namespaceURI = 'http://www.w3.org/2000/svg';

    const rect = document.createElementNS(namespaceURI, 'rect');
    rect.setAttributeNS(namespaceURI, 'width', '200');
    rect.setAttributeNS(namespaceURI, 'height', '200');

    const svg = document.createElementNS(namespaceURI, 'svg');
    svg.setAttributeNS(namespaceURI, 'width', '200');
    svg.setAttributeNS(namespaceURI, 'height', '200');
    svg.appendChild(rect);

    return observableOf(svg);
  }
}

@Component({
  template: `<app-svg-icon [key]="key"></app-svg-icon>`
})
class SvgIconWrapperComponent {
  key = '';
}

describe('SvgIconComponent', () => {
  let component: SvgIconComponent;
  let fixtureDebugElement: DebugElement;
  let wrapperComponent: SvgIconWrapperComponent;
  let wrapperFixture: ComponentFixture<SvgIconWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SvgIconComponent, SvgIconWrapperComponent],
      providers: [
        { provide: SvgIconRegistry, useClass: MockSvgIconRegistry }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    wrapperFixture = TestBed.createComponent(SvgIconWrapperComponent);
    wrapperComponent = wrapperFixture.componentInstance;
    fixtureDebugElement = wrapperFixture.debugElement.query(By.directive(SvgIconComponent));
    component = fixtureDebugElement.injector.get(SvgIconComponent);
  });

  const inj = (fn: (svgIconRegistry: SvgIconRegistry) => void) => inject([SvgIconRegistry], fn);

  it('should have no child initially', () => {
    wrapperFixture.detectChanges();
    expect(fixtureDebugElement.children.length).toBe(0);
  });

  it('should display SVG when setting the key', inj(svgIconRegistry => {
    const svgSpy = spyOn(svgIconRegistry, 'getSvgIcon').and.callThrough();

    wrapperComponent.key = 'foo';
    wrapperFixture.detectChanges();

    expect(svgSpy).toHaveBeenCalledWith('foo');
    const svg = fixtureDebugElement.nativeElement as SVGSVGElement;
    expect(svg).toBeTruthy();
    expect(svg.querySelector('rect')).toBeTruthy();
  }));
});
