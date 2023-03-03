import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../../demo/service/product.service";
import {User} from "../model/user";
import {Urun} from "../model/urun";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.css']
})
export class LoginComponent implements OnInit{

    username: any;
    password: any;

    users!: User[];


    constructor(private router: Router,private productService:ProductService) {
        // @ts-ignore
        localStorage.setItem('userType',null)
    }

    redirectAdmin(): void {

        this.users.forEach(v => {
            if(this.username == v.username && this.password == v.password){
                console.log(v?.rol?.roleName!)
                localStorage.setItem('userType',this.username)
                this.router.navigate([`${v?.rol?.roleName!}`])
            }

        })

    }

    ngOnInit(): void {
        this.productService.getAllUsers().subscribe((resp : User[]) => this.users = resp)
    }


}
