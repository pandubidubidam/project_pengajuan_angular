import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

const materialComponent = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatRadioModule,
  MatListModule,
  MatTreeModule,
  MatMenuModule,
  MatDialogModule,
  MatTooltipModule,
  MatCardModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    materialComponent
  ]
})
export class MaterialModule { }
