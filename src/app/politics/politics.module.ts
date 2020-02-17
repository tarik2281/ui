import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgbComponent } from 'src/app/politics/agb/agb.component';
import { ImpressumComponent } from 'src/app/politics/impressum/impressum.component';
import { PrivacyPolicyComponent } from 'src/app/politics/privacy-policy/privacy-policy.component';
import { PoliticsRoutingModule } from 'src/app/politics/politics-routing.module';
import { TosTextComponent } from 'src/app/politics/tos-text/tos-text.component';

@NgModule({
  declarations: [
    AgbComponent,
    ImpressumComponent,
    PrivacyPolicyComponent,
    TosTextComponent
  ],
  imports: [
    CommonModule,
    PoliticsRoutingModule
  ],
  exports: [
    TosTextComponent
  ]
})
export class PoliticsModule { }
