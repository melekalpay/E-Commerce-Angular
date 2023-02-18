import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.css']
})
export class LoginComponent {

    username: any;
    password: any;

    constructor(private router: Router) {
    }

    redirectAdmin(): void {
        if (this.username == "admin" && this.password == "admin") {
            this.router.navigate(['/admin']);
        } else if (this.username == "user" && this.password == "user") {
            this.router.navigate(['/user']);
        } else {
            alert("Wrong Password or Username")
        }
    }

}
