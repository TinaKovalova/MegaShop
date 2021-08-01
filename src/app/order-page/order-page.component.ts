import { Component, OnInit } from '@angular/core';
import {OrderService} from "../services/order.service";
import {SalePosition} from "../intrfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrdersService} from "../services/orders.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  form!:FormGroup
  order:SalePosition[]=[]
  sum=0
  constructor( private orderService:OrderService,
               private ordersService:OrdersService,
               private fb:FormBuilder,
               private router: Router) { }

  ngOnInit(): void {
    this.order=this.orderService.order
    this.sum=this.orderService.sum
    this.form=this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      phone:[null,[Validators.required,Validators.pattern(/^\+\d{12}/)]]
    })

  }
  get _phone() {
    return this.form.get('phone')!
  }
  get _email() {
    return this.form.get('email')!
  }

  deletePosition(i: number) {
   this.orderService.deleteProduct(i)
    this.sum=this.orderService.sum
  }

   onSubmit() {

      this.ordersService.add(this.form.value.email, this.form.value.phone,this.sum,this.order)
        .subscribe( ()=>this.router.navigate(['/catalog']))
  }
}
