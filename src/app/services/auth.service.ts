import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../intrfaces";
import {tap} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token!: string|any
  baseUrl = 'https://localhost:44376/auth'

  constructor(private http: HttpClient) {
  }


  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.baseUrl + '/login', user).pipe(
      tap(
        ({token}) => {
          localStorage.setItem('authToken', token)
          this.setToken(token)
        }
      )
    )
  }
  register(user:User):Observable<User> {
    return this.http.post<User>(this.baseUrl + '/register', user)
  }
  setToken(token:string){
    this.token=token
  }
  getToken():string{
    return this.token
  }
  isAuth():boolean{
    return !!this.token
  }
  logout(){
    this.token=null
    localStorage.clear()
  }
}


