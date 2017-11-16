import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  public numCenter: number[];
  public showLeft: boolean;
  public showDotLeft: boolean;
  public showRight: boolean;
  public showDotRight: boolean;

  @Input() min: number;
  @Input() max: number;
  @Input() current: number;
  @Input() padding = 1;

  updateParams() {
    this.min = +this.min;
    this.max = +this.max;
    this.current = +this.current;

    if (this.current < this.min) {
      this.current = this.min;
    } else if (this.current > this.max) {
      this.current = this.max;
    }

    this.showLeft = (this.current - this.min > this.padding);
    this.showRight = (this.max - this.current > this.padding);

    this.showDotLeft = (this.current - this.min > this.padding + 1);
    this.showDotRight = (this.max - this.current > this.padding + 1);

    const centerLeft = Math.max(
      Math.min(this.current - this.padding, this.max - this.padding * 2),
      this.min
    );
    const centerRight = Math.min(
      Math.max(this.current + this.padding, this.min + this.padding * 2),
      this.max
    );

    this.numCenter = [];
    for (let i = centerLeft; i <= centerRight; i++) {
      this.numCenter.push(i);
    }
  }

  ngOnInit() {
    this.updateParams();
  }

  ngOnChanges() {
    this.updateParams();
  }
}
