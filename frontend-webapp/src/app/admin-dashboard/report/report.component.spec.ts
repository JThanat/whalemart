import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs/observable/of';
import { ReportComponent } from './report.component';
import { ReportService } from './report.service';

class MockReportService {
  getReportList() {
    return of([]);
  }
}

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ReportComponent],
        providers: [{ provide: ReportService, useClass: MockReportService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
