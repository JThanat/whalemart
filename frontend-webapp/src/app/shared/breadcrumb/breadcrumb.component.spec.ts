import { CommonModule } from '@angular/common';
import {
  Component,
  DebugElement,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BreadcrumbItemDirective } from './breadcrumb-item.directive';
import { BreadcrumbComponent } from './breadcrumb.component';

@Component({
  template: `
    <app-breadcrumb>
      <a *appBreadcrumbItem>A</a>
      <span *appBreadcrumbItem>B</span>
      <a *appBreadcrumbItem>C</a>
      <span *appBreadcrumbItem>D</span>
    </app-breadcrumb>
  `
})
class TestBreadcrumbComponent { }

// A mocked appSubNavBar directive that behaves like `*ngIf="true"`.
@Directive({ selector: '[appSubNavBar]' })
class MockSubNavBarDirective {
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}

@Component({ selector: 'app-svg-icon', template: 'SVG' })
class MockSvgIconComponent {
  @Input() key: string;
}

describe('BreadcrumbComponent', () => {
  let fixture: ComponentFixture<TestBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [
        TestBreadcrumbComponent,
        BreadcrumbComponent,
        BreadcrumbItemDirective,
        MockSubNavBarDirective,
        MockSvgIconComponent
      ],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBreadcrumbComponent);
    fixture.detectChanges();
  });

  const expectSvg = (debugElem: DebugElement) => {
    const svgIconComponent = debugElem.componentInstance;
    expect(svgIconComponent).toBeTruthy();
    expect(svgIconComponent.key).toBe('arrow-head-right');
  };

  const expectElement = (debugElem: DebugElement, tagName: string, content: string) => {
    expect(debugElem.name).toBe(tagName);
    const elem = debugElem.nativeElement as HTMLElement;
    expect(elem.innerText).toBe(content);
  };

  it('should display breadcrumb correctly', () => {
    const breadcrumbElem = fixture.debugElement
      .query(By.directive(BreadcrumbComponent));

    const navElem = breadcrumbElem.query(By.css('nav'));
    expect(navElem).toBeTruthy();
    expect(navElem.children.length).toBe(7);

    expectElement(navElem.children[0], 'a', 'A');
    expectSvg(navElem.children[1]);
    expectElement(navElem.children[2], 'span', 'B');
    expectSvg(navElem.children[3]);
    expectElement(navElem.children[4], 'a', 'C');
    expectSvg(navElem.children[5]);
    expectElement(navElem.children[6], 'span', 'D');
  });
});
