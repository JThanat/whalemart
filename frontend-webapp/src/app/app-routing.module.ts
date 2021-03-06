import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './feed/feed.module#FeedModule'
  },
  {
    path: 'admin',
    loadChildren: './admin-dashboard/admin-dashboard.module#AdminDashboardModule'
  },
  {
    path: 'lessor',
    loadChildren: './lessor-dashboard/lessor-dashboard.module#LessorDashboardModule'
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
    loadChildren: './market/market.module#MarketModule'
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: 'vendor',
    loadChildren: './vendor-dashboard/vendor-dashboard.module#VendorDashboardModule'
  },
  {
    path: 'payment',
    loadChildren: './payment/payment.module#PaymentModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
