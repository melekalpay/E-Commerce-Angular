import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['card.component.css']
})
export class CardComponent {

    constructor(private auth: AuthService) {
    }

    ngOnInit(): void {
        this.CartDetails();
        this.loadCart();
    }

    getCartDetails: any = [];

    CartDetails() {
        if (localStorage.getItem('localCard')) {
            // @ts-ignore
            this.getCartDetails = JSON.parse(localStorage.getItem('localCard'));
        }
    }

    incQnt({prodId, qnt}: { prodId: any, qnt: any }) {
        for (let i = 0; i < this.getCartDetails.length; i++) {
            if (this.getCartDetails[i].id === prodId) {
                if (qnt != 5)
                    this.getCartDetails[i].amount = parseInt(qnt) + 1;
            }
        }
        localStorage.setItem('localCard', JSON.stringify(this.getCartDetails));
        this.loadCart();
    }

    decQnt({prodId, qnt}: { prodId: any, qnt: any }) {
        for (let i = 0; i < this.getCartDetails.length; i++) {
            if (this.getCartDetails[i].id === prodId) {
                if (qnt != 1)
                    this.getCartDetails[i].amount = parseInt(qnt) - 1;
            }
        }
        localStorage.setItem('localCard', JSON.stringify(this.getCartDetails));
        this.loadCart();
    }

    total: number = 0;

    loadCart() {
        if
        (localStorage.getItem('localCard')) {
            // @ts-ignore
            this.getCartDetails = JSON.parse(localStorage.getItem('localCard'));
            this.total = this.getCartDetails.reduce(function (acc: any, val: any) {
                return acc + (val.price * val.amount);
            }, 0);
        }
    }

    removeall() {
        localStorage.removeItem
        ('localCard');
        this.getCartDetails = [];
        this.total = 0;
        this.cartNumber = 0;
        this.auth.cartSubject.next
        (this.cartNumber);
    }

    singleDelete(getCartDetail: number) {
        console.log(getCartDetail);
        if (localStorage.getItem('localCard')) {
            // @ts-ignore
            this.getCartDetails = JSON.parse(localStorage.getItem('localCard'));
            for (let i = 0; i < this.getCartDetails.length; i++) {
                if (this.getCartDetails[i].id === getCartDetail) {
                    this.getCartDetails.splice(i, 1);
                    localStorage.setItem('localCard', JSON.stringify(this.getCartDetails));
                    this.loadCart();
                    this.cartNumberFunc();
                }
            }
        }
    }

    cartNumber: number = 0;

    cartNumberFunc() {
        // @ts-ignore
        var cartValue = JSON.parse(localStorage.getItem('localCard'));
        this.cartNumber = cartValue.length;
        this.auth.cartSubject.next
        (this.cartNumber);
    }
}
