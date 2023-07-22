import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GlobalHelper } from 'src/app/helpers/global-helper';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AvatarDialog, SidebarComponent } from './sidebar/sidebar.component';
import { ConfirmLogout, HeaderComponent, ProfilDialog } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NewPengajuanComponent } from './new-pengajuan/new-pengajuan.component';
import { PengajuanGuComponent } from './pengajuan-gu/pengajuan-gu.component';
import { PengajuanBttComponent } from './pengajuan-btt/pengajuan-btt.component';
import { PengajuanAddComponent } from './pengajuan-add/pengajuan-add.component';
import { PengajuanBlComponent } from './pengajuan-bl/pengajuan-bl.component';
import { PengajuanTuComponent } from './pengajuan-tu/pengajuan-tu.component';
import { PengajuanLsComponent } from './pengajuan-ls/pengajuan-ls.component';
import { PersetujuanComponent } from './persetujuan/persetujuan.component';
import { PersetujuanDetailComponent } from './persetujuan-detail/persetujuan-detail.component';
import { LacakPengajuanComponent } from './lacak-pengajuan/lacak-pengajuan.component';
import { LacakPengajuanDetailComponent } from './lacak-pengajuan-detail/lacak-pengajuan-detail.component';
import { LoaderInterceptor } from 'src/app/interceptor/loader.interceptor';
import { RevisiComponent } from './revisi/revisi.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    ProfilDialog,
    ConfirmLogout,
    HomeComponent,
    AvatarDialog,
    NewPengajuanComponent,
    PengajuanGuComponent,
    PengajuanBttComponent,
    PengajuanAddComponent,
    PengajuanBlComponent,
    PengajuanTuComponent,
    PengajuanLsComponent,
    PersetujuanComponent,
    PersetujuanDetailComponent,
    LacakPengajuanComponent,
    LacakPengajuanDetailComponent,
    RevisiComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    HttpClientModule,
    GlobalHelper
  ],
  providers: [
    GlobalHelper,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ]
})
export class DashboardModule { }
