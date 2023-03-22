import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../demo/service/product.service";
import {User} from "../model/user";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.css']
})
export class LoginComponent implements OnInit {

    username: any;
    password: any;

    users!: User[];

    tokens: any = {};

    accessToken!: any;

    keysArray: any[] = [];


    constructor(private router: Router, private productService: ProductService) {
        // @ts-ignore
        localStorage.setItem('userType', null)
        // @ts-ignore
        localStorage.setItem('userTypeName', null)
    }

    redirectAdmin(): void {

        let authRequest = {
            "userName": this.username,
            "password": this.password
        }

        if (this.username !== '' && this.username !== null && this.password !== '' && this.password !== null) {
            this.productService.generateTokenLogin(authRequest).subscribe(value => {
                console.log(value)
                this.tokens = value;
                this.accessToken = JSON.parse(value.toString());
                console.log("json", this.accessToken.accessToken)
                sessionStorage.setItem("token", this.accessToken.accessToken)
                sessionStorage.setItem("username", authRequest.userName)
                    this.users.forEach(v => {
                        console.log("this.users",this.users)
                        if(v.username === this.username){
                            console.log("rolename",v?.rol?.roleName!)
                            // @ts-ignore
                            localStorage.setItem('userType', v.id)
                            // @ts-ignore
                            localStorage.setItem('userTypeName', v?.rol?.roleName!)
                            this.router.navigate([`${v?.rol?.roleName!}`])
                        }
                    })

            })

        }else {
            alert("Username veya password boş olamaz.")
        }


    }

    ngOnInit(): void {
        this.productService.getAllUsers().subscribe((resp: User[]) => this.users = resp)
    }


    redirectRegister() {
        this.router.navigate(['register'])
    }
}
