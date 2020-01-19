import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProductViewComponent } from 'src/app/components/product-view/product-view.component';
import { OverviewAppComponent } from './pages/overview-app/overview-app.component';
import { OverviewSmarttubComponent } from './pages/overview-smarttub/overview-smarttub.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import {
  MAT_DATE_LOCALE, MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatBadgeModule,
  MatCheckboxModule,
  MatDialogModule,
  MatNativeDateModule,
  MatSnackBarModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ManageAccountComponent } from './pages/manage-account/manage-account.component';
import { FaqComponent } from './pages/faq/faq.component';
import { RouterModule } from '@angular/router';
import { RouteButtonComponent } from './components/route-button/route-button.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { HoverClassDirective } from './directives/hover-class.directive';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { TosDialogComponent } from './components/tos-dialog/tos-dialog.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { PasswordToggleDirective } from './directives/password-toggle.directive';
import { DeleteAccountComponent } from './pages/delete-account/delete-account.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LinesPipe } from 'src/app/pipes/lines.pipe';

registerLocaleData(localeDe);

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
    ShoppingCartComponent,
    TosDialogComponent,
    ChangePasswordComponent,
    PasswordToggleDirective,
    DeleteAccountComponent,
    NotFoundComponent,
    LinesPipe
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
    MatTooltipModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  entryComponents: [
    LoginDialogComponent,
    TosDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
