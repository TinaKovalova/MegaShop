import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Goods} from "../intrfaces";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  baseUrl='https://localhost:44376/good'
  constructor( private http:HttpClient) { }

  getAll(): Observable<Goods[]>{
    return this.http.get<Goods[]>(this.baseUrl)
  }
  getById(id:number):Observable<Goods>{
    return this.http.get<Goods>(`${this.baseUrl}/${id}`)
  }
  add(goodName:string, price:number, categoryId:number, manufacturerId:number):Observable<Goods>{
    return this.http.post<Goods>(this.baseUrl, {goodName,price,categoryId,manufacturerId})
  }

  update(id: number,goodName:string, price:number, categoryId:number, manufacturerId:number):Observable<Goods>{
    return this.http.put<Goods>(`${this.baseUrl}/${id}`,{goodName,price,categoryId,manufacturerId})
  }
  delete(id:number):Observable<Goods>{
    return this.http.delete<Goods>(`${this.baseUrl}/${id}`)
  }

}
