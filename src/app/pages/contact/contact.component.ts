import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupportService } from 'src/app/services/support.service';
import { MatDialog } from '@angular/material';
import { NotificationDialogComponent } from 'src/app/components/notification-dialog/notification-dialog.component';

const MAX_MESSAGE_CHARS = 400;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  supportForm: FormGroup;
  messageCharsRemaining = MAX_MESSAGE_CHARS;
  messageCtrl: FormControl;

  constructor(private supportService: SupportService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.messageCtrl = new FormControl('', [Validators.required, Validators.maxLength(MAX_MESSAGE_CHARS)]);

    this.messageCtrl.valueChanges.subscribe((value: string) => {
      this.messageCharsRemaining = MAX_MESSAGE_CHARS - value.length;
    });

    this.supportForm = new FormGroup({
      name: new FormControl('', null),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      message: this.messageCtrl
    });
  }

  onSubmit() {
    if (this.supportForm.valid) {
      this.supportForm.disable();

      this.supportService.addTicket(this.supportForm.value).subscribe(() => {
        this.supportForm.enable();
        this.supportForm.reset({name: '', emailAddress: '', message: ''});
        this.supportForm.controls.emailAddress.setErrors(null);
        this.supportForm.controls.message.setErrors(null);

        NotificationDialogComponent.open(this.dialog, {
          title: 'Anfrage erhalten',
          message: 'Deine Support-Anfrage wurde entgegengenommen und wird schnellstmöglich von uns bearbeitet.\n' +
            'Wir melden uns wieder mit einer E-Mail bei dir.'
        });
      }, () => {
        this.supportForm.enable();
      });
    }
  }

  emailHasError(error: string) {
    return this.supportForm.controls.emailAddress.hasError(error);
  }
}
