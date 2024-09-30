import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const components: any = [];
const modules = [CommonModule, ReactiveFormsModule, FormsModule];
@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
