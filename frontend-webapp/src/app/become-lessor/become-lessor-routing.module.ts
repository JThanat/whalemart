import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BecomeLessorComponent } from './become-lessor.component';

const routes: Routes = [
  {
    path: '',
    component: BecomeLessorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecomeLessorRoutingModule { }
