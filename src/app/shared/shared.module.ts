import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverClassDirective } from 'src/app/shared/directives/hover-class.directive';
import { PasswordToggleDirective } from 'src/app/shared/directives/password-toggle.directive';
import { ScrollInDirective } from 'src/app/shared/directives/scroll-in.directive';
import { NewPasswordFormComponent } from 'src/app/shared/components/new-password-form/new-password-form.component';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from 'src/app/shared/components/contact-form/contact-form.component';

@NgModule({
  declarations: [
    HoverClassDirective,
    PasswordToggleDirective,
    ScrollInDirective,
    NewPasswordFormComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [
    HoverClassDirective,
    PasswordToggleDirective,
    ScrollInDirective,
    NewPasswordFormComponent,
    ContactFormComponent
  ]
})
export class SharedModule {
}
