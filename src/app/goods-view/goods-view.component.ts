import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GoodsService} from "../services/goods.service";

@Component({
  selector: 'app-goods-view',
  templateUrl: './goods-view.component.html',
  styleUrls: ['./goods-view.component.css']
})
export class GoodsViewComponent implements OnInit {

  goods:any
  prevPath=''
  constructor(private route:ActivatedRoute,
              private goodService:GoodsService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(queryParams=>{
      this.prevPath='/catalog?category='+queryParams.category
      console.log(this.prevPath)
    })

    this.route.params.subscribe(params=>
      this.goodService.getById(+params.id).subscribe(g=>this.goods=g))
  }

}
