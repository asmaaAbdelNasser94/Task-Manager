import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
   loadComponent: () => import('./pages/analytics-page/analytics-page').then(c => c.AnalyticsPage)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
