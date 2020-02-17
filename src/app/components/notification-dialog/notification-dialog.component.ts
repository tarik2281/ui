import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

export interface NotificationData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {

  static open(dialog: MatDialog, data: NotificationData) {
    return dialog.open<NotificationDialogComponent, NotificationData>(NotificationDialogComponent, {
      data
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: NotificationData) { }

  ngOnInit() {
  }


}
