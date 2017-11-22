import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-scene-carousel',
  templateUrl: './scene-carousel.component.html',
  styleUrls: ['./scene-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneCarouselComponent implements OnChanges {
  @Input() imgUrls: string[] = [];
  imgIndex = 0;

  ngOnChanges(changes: SimpleChanges) {
    const imgUrlsChange = changes.imgUrls;
    if (
      imgUrlsChange.isFirstChange() ||
      imgUrlsChange.previousValue !== imgUrlsChange.currentValue
    ) {
      this.imgIndex = 0;
    }
  }

  selectImage(index: number) {
    this.imgIndex = index;
  }
}
