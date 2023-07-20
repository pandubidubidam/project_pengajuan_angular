import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'layout', pathMatch: 'full'
  },
  {
    path: 'layout', component: DashboardLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
