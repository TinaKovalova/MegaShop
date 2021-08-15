import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GoodsService} from "../services/goods.service";
import {Goods} from "../intrfaces";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-goods-view',
  templateUrl: './goods-view.component.html',
  styleUrls: ['./goods-view.component.css']
})
export class GoodsViewComponent implements OnInit {

  goods!:Goods
  prevPath=''
  constructor(private route:ActivatedRoute,
              private router:Router,
              private goodService:GoodsService,
              private orderService:OrderService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(queryParams=>{
      this.prevPath='/catalog?category='+queryParams.category
      console.log("route",this.route)
    })

    this.route.params.subscribe(params=>
      this.goodService.getById(+params.id).subscribe(g=>this.goods=g))
  }

  onBuy() {
    this.orderService.addProduct(this.goods)
  }

  onBack(categoryId: number) {
    this.router.navigate(['/catalog?category=]',categoryId])

  }
}
