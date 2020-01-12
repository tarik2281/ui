import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import {ProductViewComponent} from 'src/app/components/product-view/product-view.component';
import { OverviewAppComponent } from './pages/overview-app/overview-app.component';
import { OverviewSmarttubComponent } from './pages/overview-smarttub/overview-smarttub.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import {
  MAT_DATE_LOCALE,
  MatBadgeModule,
  MatCheckboxModule,
  MatDialogModule,
  MatNativeDateModule,
  MatSnackBarModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ManageAccountComponent } from './pages/manage-account/manage-account.component';
import { FaqComponent } from './pages/faq/faq.component';
import {RouterModule} from '@angular/router';
import { RouteButtonComponent } from './components/route-button/route-button.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { HoverClassDirective } from './directives/hover-class.directive';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ProductViewComponent,
    OverviewAppComponent,
    OverviewSmarttubComponent,
    LoginDialogComponent,
    RegisterUserComponent,
    ManageAccountComponent,
    FaqComponent,
    RouteButtonComponent,
    AllProductsComponent,
    ProductDetailComponent,
    HoverClassDirective,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatTreeModule,
    RouterModule,
    MatTooltipModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }
  ],
  entryComponents: [
    LoginDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
