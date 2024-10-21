import { Component, OnInit } from '@angular/core';
import { Notification } from '../../shared/models/notification';
import { NotificationService } from '../../shared/services/notification.service';
import { SharedModule } from '../../shared/shared.module';
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    console.log('Fetching notifications...');
    this.notificationService
      .getNotifications()
      .subscribe((notifications: Notification[]) => {
        console.log('Notifications:', notifications);
        this.notifications = notifications;
      });
  }

  markAsRead(notification: Notification): void {
    this.notificationService.markAsRead(notification.id);
    notification.read = true;
  }
}
