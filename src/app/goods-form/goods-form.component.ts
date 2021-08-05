import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category, Goods, Manufacturer} from "../intrfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CategoryService} from "../services/category.service";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {GoodsService} from "../services/goods.service";
import {ManufacturerService} from "../services/manufacturer.service";

@Component({
  selector: 'app-goods-form',
  templateUrl: './goods-form.component.html',
  styleUrls: ['./goods-form.component.css']
})
export class GoodsFormComponent implements OnInit {
  isNew=true
  form!:FormGroup
  product!:Goods
  categories$?:Observable<Category[]>
  manufacturers$?:Observable<Manufacturer[]>


  constructor(private route:ActivatedRoute,
              private fb:FormBuilder,
              private goodsService:GoodsService,
              private categoryService:CategoryService,
              private manufacturerService:ManufacturerService,
              private router:Router) { }

  ngOnInit(): void {
    this.categories$=this.categoryService.getAll()
    this.manufacturers$= this.manufacturerService.getAll()

    this.form=this.fb.group({
      name:[null,Validators.required],
      price:[null,[Validators.required,Validators.min(0.01)]],
      category:[null, Validators.required],
      manufacturer:[null,Validators.required]
    })
    this.form.disabled
    this.route.params.pipe(
      switchMap(
        (params:Params)=>{
          if (params['id']) {
            this.isNew = false
            return this.goodsService.getById(params['id'])
          }
          return of(null)
        }
      )
    )
      .subscribe(product=>{
        if(product){
          this.product=product
          this.form.patchValue({
            name:product.goodName,
            price:product.price,
            category:product.categoryId,
            manufacturer:product.manufacturerId
          })
        }
        this.form.enabled
      })


  }
  get _name() {
    return this.form.get('name')!
  }
  get _price() {
    return this.form.get('price')!
  }
  get _category() {
    return this.form.get('category')!
  }
  get _manufacturer() {
    return this.form.get('manufacturer')!
  }

  onSubmit() {
      let newProduct={goodName:this.form.value.name,
      categoryId:+this.form.value.category,
      manufacturerId:+this.form.value.manufacturer
    }
    let sub$
    if(this.isNew){
      sub$=this.goodsService.add(this.form.value.name,
       this.form.value.price,
       +this.form.value.category,
       +this.form.value.manufacturer)
    }else {
      sub$=this.goodsService.update(this.product.goodId,
        this.form.value.name,
        this.form.value.price,
        +this.form.value.category,
        +this.form.value.manufacturer)
    }
    sub$.subscribe( ()=>this.router.navigate(['/admin/goods']))
  }

  onDelete(goodId:number) {
    console.log('onSubmit')
    this.goodsService.delete(goodId)
      .subscribe(()=>this.router.navigate(['/admin/goods']))
  }

}
