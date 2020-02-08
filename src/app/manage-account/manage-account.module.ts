import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAccountRoutingModule } from 'src/app/manage-account/manage-account-routing.module';
import { ManageAccountComponent } from 'src/app/manage-account/pages/manage-account/manage-account.component';
import { DeleteAccountComponent } from 'src/app/manage-account/pages/delete-account/delete-account.component';
import { ChangePasswordComponent } from 'src/app/manage-account/pages/change-password/change-password.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserDataComponent } from './pages/edit-user-data/edit-user-data.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ManageAccountComponent,
    DeleteAccountComponent,
    ChangePasswordComponent,
    EditUserDataComponent,
    OrdersComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManageAccountRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class ManageAccountModule {
}
