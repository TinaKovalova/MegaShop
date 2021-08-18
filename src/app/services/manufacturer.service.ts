import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Manufacturer} from "../intrfaces";
import {SHOP_URL} from "./SHOP_URL";

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  baseUrl=SHOP_URL+'/manufacturer'
  constructor(private http:HttpClient) { }
  getAll():Observable<Manufacturer[]>{
    return this.http.get<Manufacturer[]>(this.baseUrl)
  }
  getById(id:number):Observable<Manufacturer>{
    return this.http.get<Manufacturer>(`${this.baseUrl}/${id}`)
  }
  add(manufacturerName:string):Observable<Manufacturer>{
    return this.http.post<Manufacturer>('https://localhost:44376/manufacturer',{manufacturerName})
  }
  update(id:number, manufacturerName:string):Observable<Manufacturer>{
    return this.http.put<Manufacturer>(`${this.baseUrl}/${id}`, {manufacturerName})
  }
  delete(id:number):Observable<Manufacturer>{
    return this.http.delete<Manufacturer>(`${this.baseUrl}/${id}`)
  }
}
