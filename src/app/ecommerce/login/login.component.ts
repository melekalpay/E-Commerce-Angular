import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../../demo/service/product.service";
import {User} from "../model/user";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.css']
})
export class LoginComponent implements OnInit{

    username: any;
    password: any;


    constructor(private router: Router,private productService:ProductService) {
        // @ts-ignore
        localStorage.setItem('userType',null)
    }

    redirectAdmin(): void {

        if (this.username == "admin" && this.password == "admin") {
            localStorage.setItem('userType',this.username)
            this.router.navigate(['admin'])
        } else if (this.username == "user" && this.password == "user") {
            localStorage.setItem('userType',this.username)
            this.router.navigate(['user'])
        } else {
            alert("Wrong Password or Username")
        }
    }

    ngOnInit(): void {

    }


}
