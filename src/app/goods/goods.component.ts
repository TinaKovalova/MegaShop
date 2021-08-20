import {Component, OnInit} from '@angular/core';
import {GoodsService} from "../services/goods.service";
import {Observable} from "rxjs";
import {Goods} from "../intrfaces";

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  goods$?: Observable<Goods[]>

  constructor(private godsService: GoodsService) {
  }

  ngOnInit(): void {
    this.goods$ = this.godsService.getAll()
  }
}
