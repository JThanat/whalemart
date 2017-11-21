import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserGuard } from '../shared/guard/user-guard';
import { BecomeLessorResolver } from './become-lessor-resolver.service';
import { BecomeLessorComponent } from './become-lessor.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BecomeLessorComponent,
    canActivate: [UserGuard],
    resolve: {
      lessorStatus: BecomeLessorResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecomeLessorRoutingModule { }
