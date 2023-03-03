import {AfterContentChecked, Component, DoCheck, OnInit} from '@angular/core';
import {ProductService} from "../../demo/service/product.service";
import {Router} from "@angular/router";
import {User} from "../model/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls : ['register.css']
})
export class RegisterComponent implements OnInit{
    username?: string;
    password?: string;
    user! : User;

    constructor(private productService:ProductService,private router:Router) {
    }
    ngOnInit(): void {

    }


    register() {
        this.productService.saveUser(this.username! ,this.password!).subscribe(  (response : User) => {
                console.log(response)
            },
            (error:HttpErrorResponse) => {
                alert(error.message)
            })
        this.router.navigate(['login'])
    }
}
