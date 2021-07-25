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
  create(goods:Goods):Observable<Goods>{
    return this.http.post<Goods>(this.baseUrl,goods)
  }
  update(id:number, goods:Goods):Observable<Goods>{
    return this.http.put<Goods>(`${this.baseUrl}/${id}`,goods)
  }
  delete(id:number):Observable<Goods>{
    return this.http.delete<Goods>(`${this.baseUrl}/${id}`)
  }

}
