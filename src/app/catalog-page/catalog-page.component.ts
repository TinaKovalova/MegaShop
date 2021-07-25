import { Component, OnInit} from '@angular/core';
import {GoodsService} from "../services/goods.service";
import {ManufacturerService} from "../services/manufacturer.service";
import {Goods, Manufacturer} from "../intrfaces";
import {ActivatedRoute} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css'],

})
export class CatalogPageComponent implements OnInit {

  manufacturers: Manufacturer[] = []
  goods: Goods[] = []
  categoryId: number | undefined
  manufacturerIds:number[]=[]



  constructor(private goodService: GoodsService,
              private manufacturerService: ManufacturerService,
              private router:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllGoods()
    this.getAllManufacturers()
    console.log('oninit')
  }

  getAllGoods() {
    this.router.queryParams.subscribe(params=>
    {
      this.categoryId=+params.category

      this.goodService.getAll().subscribe(goods =>
      {
        if(!this.manufacturerIds.length){
          this.goods=goods.filter(g=>g.categoryId==this.categoryId)
        } else {
          this.goods=(goods.filter(g=>g.categoryId==this.categoryId)).filter(g=>this.manufacturerIds.includes(g.manufacturerId))
        }
        console.log('getAllGoods',this.goods)
      })
    })
  }

  getAllManufacturers() {
    this.manufacturerService.getAll().subscribe(manufacturers => this.manufacturers = manufacturers)
  }


  getInfo(event: MouseEvent) {
    console.log(event.target)
  }

  sortByManufacturer(id:number) {
    this.getAllGoods()
    if(this.manufacturerIds.includes(id)){
      // console.log('includes', id)
       this.manufacturerIds= this.manufacturerIds.filter(e=>e!=id)
    }else {
      this.manufacturerIds.push(id)
      // console.log('!includes',id)
    }

    console.log('manufacturerIds',this.manufacturerIds)

    console.log('res_goods',this.goods)
    console.log('filter')
  }
}
