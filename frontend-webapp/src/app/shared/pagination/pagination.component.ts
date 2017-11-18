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
  public showLeft: boolean;
  public showRight: boolean;
  public centers: number[];

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

    let left = Math.min(
      this.current - this.padding,
      this.max - this.padding * 2 - (this.current < this.max ? 1 : 0)
    );
    let right = Math.max(
      this.current + this.padding,
      this.min + this.padding * 2 + (this.current > this.min ? 1 : 0)
    );

    this.showLeft = left > this.min + 2;
    if (!this.showLeft) {
      left = this.min;
    }

    this.showRight = right < this.max - 2;
    if (!this.showRight) {
      right = this.max;
    }

    this.centers = [];
    for (let i = Math.max(this.min, left); i <= Math.min(this.max, right); i++) {
      this.centers.push(i);
    }
  }
}
