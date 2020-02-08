import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverClassDirective } from 'src/app/shared/directives/hover-class.directive';
import { PasswordToggleDirective } from 'src/app/shared/directives/password-toggle.directive';
import { ScrollInDirective } from 'src/app/shared/directives/scroll-in.directive';

@NgModule({
  declarations: [
    HoverClassDirective,
    PasswordToggleDirective,
    ScrollInDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HoverClassDirective,
    PasswordToggleDirective,
    ScrollInDirective
  ]
})
export class SharedModule {
}
