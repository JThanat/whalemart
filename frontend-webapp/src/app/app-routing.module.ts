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
    path: 'market/:id',
    pathMatch: 'full',
    loadChildren: './market/landing/market-landing.module#MarketLandingModule'
  },
  {
    path: 'become-lessor',
    pathMatch: 'full',
    loadChildren: './become-lessor/become-lessor.module#BecomeLessorModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
