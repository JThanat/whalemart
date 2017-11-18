import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  function mergePageNums(comp: PaginationComponent): number[] {
    const { showLeft, centers, showRight } = comp;
    const arr = [...centers];
    if (showLeft) {
      arr.unshift(comp.min);
    }
    if (showRight) {
      arr.push(comp.max);
    }
    return arr;
  }

  function expectPaginationProps(
    comp: PaginationComponent,
    showLeft: boolean,
    centerElm: number[],
    showRight: boolean
  ) {
    expect(comp.showLeft).toBe(showLeft);
    expect(mergePageNums(comp)).toEqual(centerElm);
    expect(comp.showRight).toBe(showRight);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  describe('pagination with <= 4 elements', () => {
    it('should display 1 element when given 1 element', () => {
      component.min = 1;
      component.current = 1;
      component.max = 1;
      component.ngOnChanges();

      expectPaginationProps(component, false, [1], false);
    });

    it('should display 2 elements when given 2 elements', () => {
      component.min = 1;
      component.current = 1;
      component.max = 2;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, false, [1, 2], false);
    });

    it('should display 3 elements when given 3 elements', () => {
      component.min = 1;
      component.current = 1;
      component.max = 3;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, false, [1, 2, 3], false);
    });

    it('should display 4 elements when given 4 elements', () => {
      component.min = 1;
      component.current = 1;
      component.max = 4;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, false, [1, 2, 3, 4], false);
    });
  });

  describe('pagination with 5 elements', () => {
    const numElement = 5;
    const expectedPageNums: number[] = [];

    for (let i = 1; i <= numElement; i++) {
      expectedPageNums.push(i);
    }

    for (let i = 1; i <= numElement; i++) {
      it(`should display ${numElement} elements when current position is ${i}`, () => {
        component.min = 1;
        component.current = i;
        component.max = numElement;
        component.ngOnChanges();
        fixture.detectChanges();

        expectPaginationProps(component, false, expectedPageNums, false);
      });
    }
  });

  describe('pagination with custom min/max', () => {
    it('should display correctly when max is large', () => {
      component.min = 1;
      component.current = 170;
      component.max = 999;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, true, [1, 169, 170, 171, 999], true);
    });

    it('should display correctly when min and max is same number', () => {
      component.min = 16;
      component.current = 16;
      component.max = 16;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, false, [16], false);
    });

    it('should display right dot', () => {
      component.min = 100;
      component.current = 101;
      component.max = 500;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, false, [100, 101, 102, 103, 500], true);
    });

    it('should display left dot', () => {
      component.min = 100;
      component.current = 499;
      component.max = 500;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, true, [100, 497, 498, 499, 500], false);
    });
  });

  describe('pagination with custom padding', () => {
    it('should display 7 elements when padding is 2', () => {
      component.min = 5;
      component.current = 16;
      component.max = 30;
      component.padding = 2;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, true, [5, 14, 15, 16, 17, 18, 30], true);
    });

    it('should display 7 elements when padding is 2 and current is on left', () => {
      component.min = 5;
      component.current = 5;
      component.max = 20;
      component.padding = 2;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, false, [5, 6, 7, 8, 9, 20], true);
    });

    it('should display 7 elements when padding is 2 and current is on right', () => {
      component.min = 5;
      component.current = 20;
      component.max = 20;
      component.padding = 2;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, true, [5, 16, 17, 18, 19, 20], false);
    });

    it('should display 13 elements when padding is 5', () => {
      component.min = 10;
      component.current = 50;
      component.max = 100;
      component.padding = 5;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(
        component,
        true,
        [10, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 100],
        true
      );
    });
  });

  describe('pagination with edge case', () => {
    it('should display only single element when max is lesser than min', () => {
      component.min = 1;
      component.current = 1;
      component.max = -123;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, false, [1], false);
    });

    it('should display correct position when given position is incorrect', () => {
      component.min = 1;
      component.current = -123;
      component.max = 10;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, false, [1, 2, 3, 10], true);
      expect(component.current).toBe(1);

      component.current = 123;
      component.ngOnChanges();
      fixture.detectChanges();

      expectPaginationProps(component, true, [1, 8, 9, 10], false);
      expect(component.current).toBe(10);
    });
  });

  it('should change the dot to number when edge number is adjacent with center', () => {
    component.min = 4;
    component.current = 8;
    component.max = 12;
    component.padding = 2;
    component.ngOnChanges();
    fixture.detectChanges();

    expectPaginationProps(component, false, [4, 5, 6, 7, 8, 9, 10, 11, 12], false);
  });

  it('should remove dot when number is adjacent', () => {
    component.min = 10;
    component.current = 12;
    component.max = 14;
    component.ngOnChanges();
    fixture.detectChanges();

    expectPaginationProps(component, false, [10, 11, 12, 13, 14], false);
  });

  it('should emit navigate when trigger button', () => {
    component.min = 5;
    component.current = 6;
    component.max = 7;

    const navigateSpy = jasmine.createSpy();
    component.navigate.subscribe(navigateSpy);

    component.ngOnChanges();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.btn'));
    button.nativeElement.click();

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy.calls.mostRecent().args).toEqual([5]);
  });

  it('should not emit navigate when click on active button', () => {
    component.min = 5;
    component.current = 6;
    component.max = 7;

    const navigateSpy = jasmine.createSpy();
    component.navigate.subscribe(navigateSpy);

    component.ngOnChanges();
    fixture.detectChanges();

    const button = fixture.debugElement.queryAll(By.css('.btn'));
    button[1].nativeElement.click();

    expect(navigateSpy).toHaveBeenCalledTimes(0);
  });
});
