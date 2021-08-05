import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Goods, Sale, SalePosition} from "../intrfaces";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl='https://localhost:44376/sale'
  constructor( private http:HttpClient) { }
  add(userPhone:string, userEmail:number, summa:number,salePos:SalePosition[]):Observable<Sale>{
    return this.http.post<Sale>(this.baseUrl, {userPhone,userEmail,summa,salePos})
  }
}
