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
import { OverviewAppComponent } from './pages/overview-app/overview-app.component';
import { OverviewSmarttubComponent } from './pages/overview-smarttub/overview-smarttub.component';
import {
  MAT_DATE_LOCALE, MAT_DIALOG_SCROLL_STRATEGY, MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatBadgeModule, MatButtonToggleModule,
  MatCheckboxModule,
  MatDialogModule, MatExpansionModule,
  MatNativeDateModule,
  MatSnackBarModule, MatTableModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FaqComponent } from './pages/faq/faq.component';
import { RouterModule } from '@angular/router';
import { RouteButtonComponent } from './components/route-button/route-button.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { TosDialogComponent } from './components/tos-dialog/tos-dialog.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LinesPipe } from 'src/app/pipes/lines.pipe';
import { BlockScrollStrategy, NoopScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { LoginComponent } from './pages/login/login.component';
import { ManageAccountModule } from 'src/app/manage-account/manage-account.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactComponent } from './pages/contact/contact.component';
import { ProcessOrderComponent } from './pages/process-order/process-order.component';
import { OrderEnterDataComponent } from './pages/order-enter-data/order-enter-data.component';
import { RegisterNewsletterComponent } from './components/register-newsletter/register-newsletter.component';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
import { PoliticsModule } from 'src/app/politics/politics.module';
import { OrderCompleteDialogComponent } from './components/order-complete-dialog/order-complete-dialog.component';

registerLocaleData(localeDe);

export function scrollFactory(overlay: Overlay): () => NoopScrollStrategy {
  return () => overlay.scrollStrategies.noop();
}

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    OverviewAppComponent,
    OverviewSmarttubComponent,
    RegisterUserComponent,
    FaqComponent,
    RouteButtonComponent,
    AllProductsComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    TosDialogComponent,
    NotFoundComponent,
    LinesPipe,
    LoginComponent,
    ContactComponent,
    ProcessOrderComponent,
    OrderEnterDataComponent,
    RegisterNewsletterComponent,
    NotificationDialogComponent,
    OrderCompleteDialogComponent
  ],
  imports: [
    BrowserModule,
    ManageAccountModule,
    PoliticsModule,
    SharedModule,
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
    FormsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatTableModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    // { provide: MAT_DIALOG_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  entryComponents: [
    TosDialogComponent,
    NotificationDialogComponent,
    OrderCompleteDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
