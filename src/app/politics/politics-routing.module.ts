import { RouterModule, Routes } from '@angular/router';
import { ManageAccountComponent } from 'src/app/manage-account/pages/manage-account/manage-account.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { EditUserDataComponent } from 'src/app/manage-account/pages/edit-user-data/edit-user-data.component';
import { OrdersComponent } from 'src/app/manage-account/pages/orders/orders.component';
import { PaymentsComponent } from 'src/app/manage-account/pages/payments/payments.component';
import { ChangePasswordComponent } from 'src/app/manage-account/pages/change-password/change-password.component';
import { DeleteAccountComponent } from 'src/app/manage-account/pages/delete-account/delete-account.component';
import { NgModule } from '@angular/core';
import { AgbComponent } from 'src/app/politics/agb/agb.component';
import { PrivacyPolicyComponent } from 'src/app/politics/privacy-policy/privacy-policy.component';
import { ImpressumComponent } from 'src/app/politics/impressum/impressum.component';

const routes: Routes = [
  {
    path: 'agb',
    component: AgbComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'impressum',
    component: ImpressumComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliticsRoutingModule {
}
