import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PingComponent } from './ping.component';

const routes: Routes = [
  {
    path: '',
    component: PingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PingRoutingModule { }
