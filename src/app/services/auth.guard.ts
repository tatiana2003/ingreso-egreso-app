import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{
  /**
   *
   */
  constructor(private authService:AuthService, private router:Router) {
    
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuth().pipe(
      tap(estado=>{
        if(!estado){
          this.router.navigate(['/login'])
        }
      }),
      take(1)
    );
  }
  canActivate(): Observable<boolean>{
    return this.authService.isAuth().pipe(
      tap(estado=>{
        if(!estado){
          this.router.navigate(['/login'])
        }
      })
    );
  }
  
}
