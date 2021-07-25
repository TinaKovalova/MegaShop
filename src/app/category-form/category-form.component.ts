import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {switchMap} from "rxjs/operators";
import {CategoryService} from "../services/category.service";
import {of} from "rxjs";
import {Category} from "../intrfaces";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  isNew=true
  form!:FormGroup
  category!:Category

  constructor(private route:ActivatedRoute,
              private fb:FormBuilder,
              private categoryService:CategoryService,
              private router:Router) { }

  ngOnInit(): void {

    this.form=this.fb.group({
      name:[null,Validators.required]
    })
    this.form.disabled
    this.route.params.pipe(
      switchMap(
        (params:Params)=>{
          if (params['id']) {
            this.isNew = false
            return this.categoryService.getById(params['id'])
          }
          return of(null)
        }
      )
    )
      .subscribe(category=>{
        if(category){
          this.category=category
          this.form.patchValue({
            name:category.categoryName
          })
        }
        this.form.enabled
      })


  }
  get _name() {
    return this.form.get('name')!
  }

  onSubmit() {
    let sub$
    if(this.isNew){
      sub$=this.categoryService.add(this.form.value.name)
    }else {
      sub$=this.categoryService.update(this.category.categoryId,this.form.value.name)
    }
    sub$.subscribe( ()=>this.router.navigate(['/admin/category']))
  }

  onDelete(categoryId: number) {
    console.log('onSubmit')
    this.categoryService.delete(categoryId)
      .subscribe(()=>this.router.navigate(['/admin/category']))
  }
}
