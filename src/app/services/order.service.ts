import { Injectable } from '@angular/core';
import {Goods, SalePosition} from "../intrfaces";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order:SalePosition[]=[]
  sum=0
  constructor() { }
  addProduct(product:Goods){
    let position=this.order.find(goods=>goods.goodId===product.goodId)

    if(position){
     position.countGood++
    }else {
      position=Object.assign({},{
        goodId:product.goodId,
        countGood:1,
        summa:product.price,
        goodName:product.goodName
      })
      this.order.push(position)
    }
    this.computeSum()
  }
  deleteProduct(i:number){
    this.order.splice(i,1)
    this.computeSum()
  }
  clearOrder(){
    this.order=[]
    this.sum=0
  }
  computeSum(){
    this.sum= this.order.reduce((s,item)=>{
      return s+=item.countGood*item.summa
    },0)
  }
}
