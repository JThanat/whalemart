import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';

@NgModule({
  imports: [
    SharedModule,
    FeedRoutingModule
  ],
  declarations: [FeedComponent]
})
export class FeedModule { }
