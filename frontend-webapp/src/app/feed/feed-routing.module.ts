import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedResolver } from './feed-resolver.service';
import { FeedComponent } from './feed.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FeedComponent,
    resolve: {
      marketFeed: FeedResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
