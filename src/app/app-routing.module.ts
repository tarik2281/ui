import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutUsComponent} from 'src/app/pages/about-us/about-us.component';
import {OverviewAppComponent} from 'src/app/pages/overview-app/overview-app.component';
import {OverviewSmarttubComponent} from 'src/app/pages/overview-smarttub/overview-smarttub.component';
import {RegisterUserComponent} from 'src/app/pages/register-user/register-user.component';
import {ManageAccountComponent} from 'src/app/pages/manage-account/manage-account.component';
import {AuthGuard} from 'src/app/services/auth-guard.service';
import {FaqComponent} from 'src/app/pages/faq/faq.component';
import {ProductViewComponent} from 'src/app/components/product-view/product-view.component';
import {AllProductsComponent} from 'src/app/pages/all-products/all-products.component';
import {ProductDetailComponent} from 'src/app/pages/product-detail/product-detail.component';
import {ShoppingCartComponent} from 'src/app/pages/shopping-cart/shopping-cart.component';
import {ChangePasswordComponent} from 'src/app/pages/change-password/change-password.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about-us'
  },
  {
    path: 'overview-smarttub',
    component: OverviewSmarttubComponent
  },
  {
    path: 'overview-app',
    component: OverviewAppComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent
  },
  {
    path: 'manage-account',
    component: ManageAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'products',
    component: AllProductsComponent
  },
  {
    path: 'products/detail',
    component: ProductDetailComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
