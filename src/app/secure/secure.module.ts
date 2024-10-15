import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SecureRoutingModule } from './secure-routing.module';

@NgModule({
  declarations: [
    // DashboardOverviewComponent, IconsComponent, MapsComponent
  ],
  imports: [CommonModule, SecureRoutingModule],
})
export class SecureModule {}
