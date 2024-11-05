import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { firebaseUrl } from '../firebase/firebase-url';
import { INotification } from '../models/INotification';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private unreadCountSubject = new BehaviorSubject<number>(
    this.getInitialUnreadCount()
  );
  unreadCount$ = this.unreadCountSubject.asObservable();
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private firebaseService: FirebaseService) {
    this.updateUnreadCount();
  }
  getNotifications(): Observable<INotification[]> {
    return this.firebaseService.getRequest('notifications').pipe(
      map((response) => {
        if (response) {
          return Object.keys(response)
            .map((key) => ({
              id: key,
              ...response[key],
            }))
            .filter((noti) => noti.title);
        } else {
          return [];
        }
      })
    );
  }

  private getInitialUnreadCount(): number {
    const storedCount = localStorage.getItem('unreadCount');
    return storedCount ? parseInt(storedCount, 10) : 0;
  }

  private updateLocalStorageCount(count: number): void {
    localStorage.setItem('unreadCount', count.toString());
  }

  addNotification(notification: INotification): void {
    if (!notification || !notification.title || !notification.icon) {
      console.error('Invalid notification data:', notification);
      return;
    }
    const newNotification = {
      ...notification,
      time: new Date().toISOString(),
      read: false,
    };
    this.firebaseService
      .postRequest(`${firebaseUrl}notifications.json`, newNotification, {
        headers: this.headers,
      })
      .subscribe(() => this.updateUnreadCount());
  }

  getNotificationById(notificationId: string): Observable<INotification> {
    return this.firebaseService
      .getRequest(`notifications/${notificationId}.json`)
      .pipe(
        map((response) => ({
          id: notificationId,
          ...response,
        }))
      );
  }
  markAsRead(notificationId: string): void {
    this.firebaseService
      .patchRequest(
        `${firebaseUrl}notifications/${notificationId}.json`,
        { read: true },
        { headers: this.headers }
      )
      .subscribe(
        () => {
          console.log(`Notification ${notificationId} marked as read.`);
          this.decreaseUnreadCount();
        },
        (error) => {
          console.error('Error marking notification as read:', error);
        }
      );
  }
  decreaseUnreadCount(): void {
    const currentCount = this.unreadCountSubject.getValue();
    if (currentCount > 0) {
      this.unreadCountSubject.next(currentCount - 1);
      this.updateLocalStorageCount(currentCount - 1);
    }
  }
  updateUnreadCount(): void {
    this.getNotifications()
      .pipe(
        map(
          (notifications) =>
            notifications.filter((notification) => !notification.read).length
        )
      )
      .subscribe((unreadCount) => {
        this.unreadCountSubject.next(unreadCount);
        this.updateLocalStorageCount(unreadCount);
      });
  }
}
