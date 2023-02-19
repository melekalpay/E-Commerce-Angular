import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
    cartSubject = new Subject<any>();



    adminAuth() {
        if(localStorage.getItem('userType')=="admin"){
            return true;
        }
        return false;
}

    userAuth() {
        if(localStorage.getItem('userType')=="user"){
            return true;
        }
        return false;
    }


}
