import { Component, OnInit } from '@angular/core';
import {OrderService} from "../services/order.service";
import {SalePosition} from "../intrfaces";


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  order:SalePosition[]=[]
  sum=0
  constructor( private orderService:OrderService) { }

  ngOnInit(): void {
    this.order=this.orderService.order
    this.sum=this.orderService.sum

  }

  deletePosition(i: number) {
   this.orderService.deleteProduct(i)
    this.sum=this.orderService.sum
  }

  placeAnOrder() {
    console.log()
  }
}
