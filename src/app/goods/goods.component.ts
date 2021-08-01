import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GoodsService} from "../services/goods.service";
import {Observable} from "rxjs";
import {Goods} from "../intrfaces";
import {CategoryService} from "../services/category.service";


@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit{
  goods$?:Observable<Goods[]>

  constructor(private godsService: GoodsService) {
  }

  ngOnInit(): void {
    this.goods$= this.godsService.getAll()
  }

}
