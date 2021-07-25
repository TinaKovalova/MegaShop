import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../intrfaces";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl='https://localhost:44376/category'

  constructor(private http:HttpClient) { }
  getAll():Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl)
  }
  getById(id:number):Observable<Category>{
    return this.http.get<Category>(`${this.baseUrl}/${id}`)
  }
  add(categoryName:string):Observable<Category>{
    return this.http.post<Category>(this.baseUrl, {categoryName})
  }
  update(id:number, categoryName:string):Observable<Category>{
    return this.http.put<Category>(`${this.baseUrl}/${id}`, {categoryName})
  }
  delete(id:number):Observable<Category>{
    return this.http.delete<Category>(`${this.baseUrl}/${id}`)
  }
}
