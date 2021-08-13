import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserData, User} from "../intrfaces";
import {tap} from "rxjs/operators"
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token!: object | any
  baseUrl = 'https://localhost:44376/auth'
  userData!: UserData | any

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.baseUrl + '/login', user).pipe(
      tap(
        ({token}) => {
          localStorage.setItem('authToken', token)
          this.setToken(token)
          this.userData = this.getUserData(token)
          console.log(this.userData)
        }
      )
    )
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/register', user)
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuth(): boolean {
    return !!this.token
  }

  logout() {
    this.token = null
    this.userData = null
    localStorage.clear()
  }

  getUserData(token: string): UserData {
    return jwt_decode(token) as UserData
  }
}


