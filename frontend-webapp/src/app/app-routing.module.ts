import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './feed/feed.module#FeedModule'
  },
  {
    path: 'ping',
    loadChildren: './ping/ping.module#PingModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule'
  },
  {
    path: 'become-lessor',
    loadChildren: './become-lessor/become-lessor.module#BecomeLessorModule'
  },
  {
    path: 'market/:id',
    pathMatch: 'full',
    loadChildren: './market/landing/market-landing.module#MarketLandingModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
