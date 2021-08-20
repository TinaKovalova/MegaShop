import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Photo} from "../intrfaces";
import {SHOP_URL} from "./SHOP_URL";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = SHOP_URL + '/photo'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.baseUrl)
  }

  getById(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.baseUrl}/${id}`)
  }

  add(photoPath: string, goodId: number): Observable<Photo> {
    return this.http.post<Photo>(this.baseUrl, {goodId, photoPath})
  }

  update(id: number, photoPath: string, goodId: number): Observable<Photo> {
    return this.http.put<Photo>(`${this.baseUrl}/${id}`, {goodId, photoPath})
  }

  delete(id: number): Observable<Photo> {
    return this.http.delete<Photo>(`${this.baseUrl}/${id}`)
  }
}
