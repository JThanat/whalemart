import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FeedResolver } from './feed-resolver.service';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';

@NgModule({
  imports: [
    SharedModule,
    FeedRoutingModule
  ],
  declarations: [FeedComponent],
  providers: [FeedResolver]
})
export class FeedModule { }
