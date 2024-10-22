import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  showNotification = false;
  message = '';
  notificationType: 'success' | 'error' = 'success';

  show(message: string, type: 'success' | 'error' = 'success'): void {
    this.message = message;
    this.notificationType = type;
    this.showNotification = true;

    setTimeout(() => this.showNotification = false, 3000);
  }

  closeNotification(): void {
    this.showNotification = false;
  }
}
