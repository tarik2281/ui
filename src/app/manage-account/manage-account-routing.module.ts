import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManageAccountComponent } from 'src/app/manage-account/pages/manage-account/manage-account.component';
import { ChangePasswordComponent } from 'src/app/manage-account/pages/change-password/change-password.component';
import { DeleteAccountComponent } from 'src/app/manage-account/pages/delete-account/delete-account.component';
import { EditUserDataComponent } from 'src/app/manage-account/pages/edit-user-data/edit-user-data.component';
import { OrdersComponent } from 'src/app/manage-account/pages/orders/orders.component';
import { PaymentsComponent } from 'src/app/manage-account/pages/payments/payments.component';

const routes: Routes = [
  {
    path: 'manage-account',
    component: ManageAccountComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EditUserDataComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'delete-account',
        component: DeleteAccountComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAccountRoutingModule {
}
