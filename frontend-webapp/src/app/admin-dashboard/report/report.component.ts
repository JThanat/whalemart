import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Report, ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  reports$: Observable< Report[]>;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reports$ = this.reportService.getReportList();
  }
}
