import { Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { NotificationsComponent } from './notifications/notifications.component';

export const lazyRoutesPublic: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
    ],
  },
];
