import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutUsComponent} from 'src/app/pages/about-us/about-us.component';
import {OverviewAppComponent} from 'src/app/pages/overview-app/overview-app.component';
import {OverviewSmarttubComponent} from 'src/app/pages/overview-smarttub/overview-smarttub.component';
import {RegisterUserComponent} from 'src/app/pages/register-user/register-user.component';
import {FaqComponent} from 'src/app/pages/faq/faq.component';
import {AllProductsComponent} from 'src/app/pages/all-products/all-products.component';
import {ProductDetailComponent} from 'src/app/pages/product-detail/product-detail.component';
import {ShoppingCartComponent} from 'src/app/pages/shopping-cart/shopping-cart.component';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
import { ProcessOrderComponent } from 'src/app/pages/process-order/process-order.component';
import { OrderEnterDataComponent } from 'src/app/pages/order-enter-data/order-enter-data.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
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
    path: 'login',
    component: LoginComponent
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
    path: 'products/:id',
    component: ProductDetailComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'process-order',
    component: ProcessOrderComponent
  },
  {
    path: 'order-enter-data',
    component: OrderEnterDataComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
