import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private authservice : AuthService,private router:Router) {
    }
    canActivate() {
        if(this.authservice.adminAuth()){
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
