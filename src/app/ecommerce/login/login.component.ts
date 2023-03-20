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


    constructor(private router: Router, private productService: ProductService) {
        // @ts-ignore
        localStorage.setItem('userType', null)
        // @ts-ignore
        localStorage.setItem('userTypeName', null)
    }

    redirectAdmin(): void {
        this.users.forEach(v => {
            if (this.username == v.username && this.password == v.password) {
                console.log(v?.rol?.roleName!)
                // @ts-ignore
                localStorage.setItem('userType', v.id)
                // @ts-ignore
                localStorage.setItem('userTypeName', v?.rol?.roleName!)
                this.router.navigate([`${v?.rol?.roleName!}`])
            }
        })

    }

    ngOnInit(): void {
        this.productService.getAllUsers().subscribe((resp: User[]) => this.users = resp)

    }


    redirectRegister() {
        this.router.navigate(['register'])
    }
}
