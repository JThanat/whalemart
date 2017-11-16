import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  public numCenter: number[];
  public showLeft: boolean;
  public showDotLeft: boolean;
  public showRight: boolean;
  public showDotRight: boolean;

  @Input() min = 1;
  @Input() max: number;
  @Input() current: number;
  @Input() padding = 1;

  updateParams() {
    if (this.current < this.min) {
      this.current = this.min;
    } else if (this.current > this.max) {
      this.current = this.max;
    }

    this.showLeft = (this.current - this.min > this.padding);
    this.showRight = (this.max - this.current > this.padding);

    const centerLeft = Math.max(
      this.current - this.padding,
      this.min
    );
    const centerRight = Math.min(
      this.current + this.padding,
      this.max
    );

    this.showDotLeft = this.min + 1 < centerLeft;
    this.showDotRight = this.max - 1 > centerRight;

    this.numCenter = [];
    for (let i = centerLeft; i <= centerRight; i++) {
      this.numCenter.push(i);
    }
  }

  ngOnChanges() {
    this.updateParams();
  }
}
