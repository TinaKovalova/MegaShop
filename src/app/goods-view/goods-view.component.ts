import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GoodsService} from "../services/goods.service";
import {Goods, Photo} from "../intrfaces";
import {OrderService} from "../services/order.service";
import {PhotoService} from "../services/photo.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-goods-view',
  templateUrl: './goods-view.component.html',
  styleUrls: ['./goods-view.component.css']
})
export class GoodsViewComponent implements OnInit {

  goods!:Goods
  queryParam!:string | null
  photos!:Photo[]
  constructor(private route:ActivatedRoute,
              private router:Router,
              private goodService:GoodsService,
              private orderService:OrderService,
              private photoService:PhotoService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(queryParams=>{
      this.queryParam=queryParams.category
      console.log("route",this.route)
    })
    this.route.params.subscribe(params=>
      this.goodService.getById(+params.id).subscribe(g=>{
        this.goods=g
        this.photoService.getAll().pipe(
          map(e=>e.filter(i=>i.goodId===this.goods.goodId))
        ).subscribe(photos=> this.photos=photos)
      }))


  }

  onBuy() {
    this.orderService.addProduct(this.goods)
  }

  onBack(categoryId: number) {
    if(this.queryParam!=null){
      this.router.navigate(['/catalog'],{queryParams:{category:categoryId}})
    }else {
      this.router.navigate(['/home'])
    }


  }
}
