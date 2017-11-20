import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneCarouselComponent } from './scene-carousel.component';

describe('SceneCarouselComponent', () => {
  let component: SceneCarouselComponent;
  let fixture: ComponentFixture<SceneCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
