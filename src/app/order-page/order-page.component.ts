import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";
import {SalePosition} from "../intrfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrdersService} from "../services/orders.service";



@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, OnDestroy {
  form!:FormGroup
  order:SalePosition[]=[]
  sum=0
  isOrdered=false
  constructor( private orderService:OrderService,
               private ordersService:OrdersService,
               private fb:FormBuilder) { }


  ngOnInit(): void {
    this.order=this.orderService.order
    this.sum=this.orderService.sum
    this.form=this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      phone:[null,[Validators.required,Validators.pattern(/^\d{10,}/), Validators.maxLength(10)]]
    })
  }
  ngOnDestroy(): void {
    this.isOrdered=false
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

      this.ordersService.add(this.form.value.phone,this.form.value.email,this.sum,this.order)
        .subscribe( ()=>{
          this.isOrdered=true
          this.orderService.clearOrder()
        })
  }


  isLogin() {
    if(localStorage.getItem('login')){
      this.form.get('email')?.setValue(localStorage.getItem('login'))
    }else {
      this.form.get('email')?.setValue(null)
    }

  }
}
