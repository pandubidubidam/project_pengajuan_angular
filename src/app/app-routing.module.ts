import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginGuard } from './pages/auth/auth-login.guard';
import { AuthDashboardGuard } from './pages/dashboard/auth-dashboard.guard';
import { NewPengajuanComponent } from './pages/dashboard/new-pengajuan/new-pengajuan.component';
import { PengajuanTuComponent } from './pages/dashboard/pengajuan-tu/pengajuan-tu.component';
import { PengajuanGuComponent } from './pages/dashboard/pengajuan-gu/pengajuan-gu.component';
import { PengajuanAddComponent } from './pages/dashboard/pengajuan-add/pengajuan-add.component';
import { PengajuanBlComponent } from './pages/dashboard/pengajuan-bl/pengajuan-bl.component';
import { PengajuanBttComponent } from './pages/dashboard/pengajuan-btt/pengajuan-btt.component';
import { PengajuanLsComponent } from './pages/dashboard/pengajuan-ls/pengajuan-ls.component';
import { PersetujuanComponent } from './pages/dashboard/persetujuan/persetujuan.component';
import { PersetujuanDetailComponent } from './pages/dashboard/persetujuan-detail/persetujuan-detail.component';
import { LacakPengajuanComponent } from './pages/dashboard/lacak-pengajuan/lacak-pengajuan.component';
import { LacakPengajuanDetailComponent } from './pages/dashboard/lacak-pengajuan-detail/lacak-pengajuan-detail.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [AuthLoginGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthDashboardGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'external/590010000', component: NewPengajuanComponent 
  },
  { 
    path: 'external/590020000', component: PersetujuanComponent 
  },
  { 
    path: 'external/590030000', component: LacakPengajuanComponent 
  },
  { 
    path: 'lacak/detail/:noPengajuan', component: LacakPengajuanDetailComponent 
  },
  { 
    path: 'persetujuan/detail/:noPengajuan', component: PersetujuanDetailComponent 
  },
  { 
    path: 'pengajuan/gu', component: PengajuanGuComponent 
  },
  { 
    path: 'pengajuan/btt', component: PengajuanBttComponent 
  },
  { 
    path: 'pengajuan/add', component: PengajuanAddComponent 
  },
  { 
    path: 'pengajuan/bl', component: PengajuanBlComponent 
  },
  { 
    path: 'pengajuan/tu', component: PengajuanTuComponent 
  },
  { 
    path: 'pengajuan/ls', component: PengajuanLsComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
