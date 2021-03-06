import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomePageComponent} from './home-page/home-page.component';
import {CatalogPageComponent} from './catalog-page/catalog-page.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {RouterModule} from "@angular/router";
import {AdminPageComponent} from './admin-page/admin-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GoodsComponent} from './goods/goods.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoryComponent} from './category/category.component';
import {ManufacturerComponent} from './manufacturer/manufacturer.component';
import {GoodsViewComponent} from './goods-view/goods-view.component';
import {CategoryFormComponent} from './category-form/category-form.component';
import {ManufacturerFormComponent} from './manufacturer-form/manufacturer-form.component';
import {GoodsFormComponent} from './goods-form/goods-form.component';
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {GoodsCardComponent} from './goods-card/goods-card.component';
import {TokenInterceptor} from "./token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CatalogPageComponent,
    OrderPageComponent,
    AdminPageComponent,
    GoodsComponent,
    CategoryComponent,
    ManufacturerComponent,
    GoodsViewComponent,
    CategoryFormComponent,
    ManufacturerFormComponent,
    GoodsFormComponent,
    RegistrationPageComponent,
    GoodsCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
