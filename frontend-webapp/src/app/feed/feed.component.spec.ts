import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';

describe('FeedComponent', () => {
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedComponent]
    }).compileComponents();
  }));

  it('should render a title in a h1 tag', async(() => {
    fixture = TestBed.createComponent(FeedComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Whalemart');
  }));
});
