import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {Category} from "../intrfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories$?:Observable<Category[]>

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
   this.categories$= this.categoryService.getAll()
  }

}
