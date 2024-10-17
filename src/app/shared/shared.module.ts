import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
const components: any = [];
const modules = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  TranslateModule,
];
@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
