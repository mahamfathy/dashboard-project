import { Component, OnInit } from '@angular/core';
import { INotification } from '../../shared/models/INotification';
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
  notifications: INotification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    console.log('Fetching notifications...');
    this.notificationService
      .getNotifications()
      .subscribe((notifications: INotification[]) => {
        console.log('Notifications:', notifications);
        this.notifications = [...notifications];
      });
  }

  markAsRead(notification: INotification): void {
    this.notificationService.markAsRead(notification.id);
    notification.read = true;
    this.notifications = this.notifications.map((noti) =>
      noti.id === notification.id ? { ...noti, read: true } : noti
    );
    console.log('Marked as read:', notification);
  }
}
