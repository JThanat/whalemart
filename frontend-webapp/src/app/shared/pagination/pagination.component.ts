import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnChanges {
  public left: number;
  public right: number;
  public center: number[];
  public showDotLeft: boolean;
  public showDotRight: boolean;

  @Input() min = 1;
  @Input() max = 1;
  @Input() current = 1;
  @Input() padding = 1;
  @Output() navigate = new EventEmitter<number>();

  go(page: number) {
    if (page === this.current) {
      return;
    }
    this.navigate.emit(page);
  }

  ngOnChanges() {
    if (this.max < this.min) {
      this.max = this.min;
    }

    if (this.current < this.min) {
      this.current = this.min;
    } else if (this.current > this.max) {
      this.current = this.max;
    }

    const pageNums: number[] = [];

    const current = this.current;
    if (current > this.min && current < this.max) {
      pageNums.push(current);
    }

    for (let i = 1, j = 1; i <= this.padding; i++) {
      const leftPad = current - j;
      const rightPad = current + j;

      if (leftPad > this.min && rightPad < this.max) {
        pageNums.unshift(leftPad);
        pageNums.push(rightPad);
        j += 1;
      } else if (leftPad > this.min) {
        pageNums.unshift(leftPad);
        if (leftPad - 1 > this.min) {
          pageNums.unshift(leftPad - 1);
        }
        j += 2;
      } else if (rightPad < this.max) {
        pageNums.push(rightPad);
        if (rightPad + 1 < this.max) {
          pageNums.push(rightPad + 1);
        }
        j += 2;
      }
    }

    this.showDotLeft = false;
    this.showDotRight = false;

    if (pageNums.length > 0) {
      if (this.min + 2 === pageNums[0]) {
        pageNums.unshift(this.min + 1);
      }
      if (this.max - 2 === pageNums[pageNums.length - 1]) {
        pageNums.push(this.max - 1);
      }
    }

    pageNums.unshift(this.min);
    if (this.min !== this.max) {
      pageNums.push(this.max);
    }

    if (pageNums.length > 1) {
      if (pageNums[0] + 1 !== pageNums[1]) {
        this.showDotLeft = true;
      }
      if (pageNums[pageNums.length - 2] + 1 !== pageNums[pageNums.length - 1]) {
        this.showDotRight = true;
      }
    }

    const left = pageNums.shift();
    if (left) { this.left = left; }

    if (pageNums.length > 0) {
      const right = pageNums.pop();
      if (right) { this.right = right; }
    }

    this.center = pageNums;
  }
}
