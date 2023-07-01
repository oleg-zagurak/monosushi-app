import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './static/header/header.component';
import { FooterComponent } from './static/footer/footer.component';
import { HomeComponent } from './page/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { ActionsComponent } from './page/actions/actions.component';
import { DeliveryComponent } from './page/delivery/delivery.component';
import { AboutUsComponent } from './page/about-us/about-us.component';
import { ProductCategoryComponent } from './page/product-category/product-category.component';
import { AdminComponent } from './page/admin/admin/admin.component';
import { AdminActionsComponent } from './page/admin/admin-actions/admin-actions.component';
import { AdminCategoryComponent } from './page/admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './page/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './page/admin/admin-orders/admin-orders.component';
import { MapComponent } from './components/map/map.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ActionInfoComponent } from './page/action-info/action-info.component';
import { ProductInfoComponent } from './page/product-info/product-info.component';
import { HeaderBasketComponent } from './components/header-basket/header-basket.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { KabinetComponent } from './page/kabinet/kabinet/kabinet.component';
import { UserInfoComponent } from './page/kabinet/user-info/user-info.component';
import { HistoryComponent } from './page/kabinet/history/history.component';
import { PasswordComponent } from './page/kabinet/password/password.component';
import { SavePopupComponent } from './components/save-popup/save-popup.component';
import { OfertaComponent } from './page/oferta/oferta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/module/shared-module/shared.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { BasketDialogComponent } from './components/basket-dialog/basket-dialog.component';
import { AdminAuthComponent } from './page/admin-auth/admin-auth.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SliderComponent,
    ActionsComponent,
    DeliveryComponent,
    AboutUsComponent,
    ProductCategoryComponent,
    AdminComponent,
    AdminActionsComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    MapComponent,
    ActionInfoComponent,
    ProductInfoComponent,
    HeaderBasketComponent,
    AuthorizationComponent,
    KabinetComponent,
    UserInfoComponent,
    HistoryComponent,
    PasswordComponent,
    SavePopupComponent,
    OfertaComponent,
    AuthDialogComponent,
    BasketDialogComponent,
    AdminAuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
