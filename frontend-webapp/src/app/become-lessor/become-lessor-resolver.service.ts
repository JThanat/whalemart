import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { BecomeLessorService, LessorStatus } from './become-lessor.service';

@Injectable()
export class BecomeLessorResolver implements Resolve<LessorStatus> {
  constructor(private becomeLessorService: BecomeLessorService) {}

  resolve(): Observable<LessorStatus>  {
    return this.becomeLessorService.checkLessorStatus();
  }
}
