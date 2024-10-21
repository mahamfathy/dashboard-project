import { Routes } from '@angular/router';
import { NotificationsComponent } from '../notifications/notifications.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { SecureComponent } from './secure.component';
import { TableListComponent } from './table-list/table-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const lazyRoutesSecure: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      { path: 'dashboard', component: DashboardOverviewComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'maps', component: MapsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'table-list', component: TableListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
