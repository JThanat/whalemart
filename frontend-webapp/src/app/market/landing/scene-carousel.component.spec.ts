import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneCarouselComponent } from './scene-carousel.component';

describe('SceneCarouselComponent', () => {
  let component: SceneCarouselComponent;
  let fixture: ComponentFixture<SceneCarouselComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SceneCarouselComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
