import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {CatalogPageComponent} from "./catalog-page/catalog-page.component";
import {OrderPageComponent} from "./order-page/order-page.component";
import {ContactsPageComponent} from "./contacts-page/contacts-page.component";
import {AdminPageComponent} from "./admin-page/admin-page.component";
import {GoodsComponent} from "./goods/goods.component";
import {CategoryComponent} from "./category/category.component";
import {ManufacturerComponent} from "./manufacturer/manufacturer.component";
import {GoodsViewComponent} from "./goods-view/goods-view.component";
import {CategoryFormComponent} from "./category-form/category-form.component";

const routes: Routes = [
  {path:'home', component:HomePageComponent},
  {path:'catalog', component:CatalogPageComponent},
  {path:'catalog/:id', component:GoodsViewComponent },
  {path:'order',component:OrderPageComponent},
  {path:'contacts', component:ContactsPageComponent},
  {path:'admin', component:AdminPageComponent, children:[
      {path:'goods', component:GoodsComponent},
      {path:'category', component:CategoryComponent},
      {path:'category/new', component:CategoryFormComponent},
      {path:'category/:id', component:CategoryFormComponent},
      {path:'manufacturer', component:ManufacturerComponent},

    ]},
  {path:'**', redirectTo:'/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
