import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

const modules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
];
@NgModule({
  declarations: [],
  imports: [modules],
  exports: [...modules],
})
export class AngularMaterialModule {}
