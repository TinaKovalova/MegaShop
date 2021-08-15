import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./services/auth.service";
import {root} from "rxjs/internal-compatibility";
@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate,CanActivateChild{
  constructor(private authService: AuthService ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if(this.authService.isAuth() || this.authService.userData.role==='1'){
      return of(true)
    } else {
      return of(false)
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute,state)
  }

}
