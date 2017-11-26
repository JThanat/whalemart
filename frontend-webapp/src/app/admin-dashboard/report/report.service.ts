import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map } from 'rxjs/operators';

export interface Report {
  report_content: string;
  time_stamp: Date;
  user: string;
  market: string;
}

interface ReportServerResponse {
  count: number;
  next: string;
  previous: string;
  results: Report[];
}

export class ReportError {}

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  getReportList(): Observable<Report[]> {
    return this.http.get<ReportServerResponse>('/api/report/').pipe(
      map(data => data.results),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new ReportError()) as Observable<Report[]>;
          }
        }
        return observableThrow(err) as Observable<Report[]>;
      })
    );
  }
}
