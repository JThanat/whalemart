import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface PingResult {
  pong: 'pong';
}

@Component({
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.scss']
})
export class PingComponent implements OnInit {
  pingData: object | undefined;
  errorData: string | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<PingResult>('/ping/').subscribe(data => {
      this.pingData = data;
    }, err => {
      if (err instanceof HttpErrorResponse) {
        this.errorData = String(err.error);
      } else {
        this.errorData = String(err);
      }
    });
  }
}
