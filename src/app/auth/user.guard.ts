import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {

    constructor(private authservice : AuthService,private router:Router) {
    }
    canActivate() {
        if(this.authservice.userAuth()){
            return true;
        }
        this.router.navigate(['']);
        return false;
    }

}
