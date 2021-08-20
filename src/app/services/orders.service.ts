import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sale, SalePosition} from "../intrfaces";
import {SHOP_URL} from "./SHOP_URL";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = SHOP_URL + '/sale'

  constructor(private http: HttpClient) {
  }

  add(userPhone: string, userEmail: number, summa: number, salePos: SalePosition[]): Observable<Sale> {
    return this.http.post<Sale>(this.baseUrl, {userPhone, userEmail, summa, salePos})
  }
}
