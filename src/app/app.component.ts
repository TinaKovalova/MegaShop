import {Component, OnInit} from '@angular/core';
import {CategoryService} from "./services/category.service";
import {Category} from "./intrfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title=''
  categories?:Category[]

  constructor(private categoryService:CategoryService) {}

  getAllCategories() {
    this.categoryService.getAll().subscribe(categories =>this.categories=categories)
  }
}
