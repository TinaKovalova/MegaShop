import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Manufacturer} from "../intrfaces";

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  baseUrl='https://localhost:44376/manufacturer'
  constructor(private http:HttpClient) { }
  getAll():Observable<Manufacturer[]>{
    return this.http.get<Manufacturer[]>(this.baseUrl)
  }
  getById(id:number):Observable<Manufacturer>{
    return this.http.get<Manufacturer>(`${this.baseUrl}/${id}`)
  }
  add(category:Manufacturer):Observable<Manufacturer>{
    return this.http.post<Manufacturer>(this.baseUrl,category)
  }
  update(id:number, category:Manufacturer):Observable<Manufacturer>{
    return this.http.put<Manufacturer>(`${this.baseUrl}/${id}`,category)
  }
  delete(id:number):Observable<Manufacturer>{
    return this.http.delete<Manufacturer>(`${this.baseUrl}/${id}`)
  }
}
