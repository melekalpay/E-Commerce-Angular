import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../../demo/service/product.service";
import {Comment} from "../model/comment";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {DialogModule} from "primeng/dialog";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {User} from "../model/user";
import {CardModule} from "primeng/card";
import {Router} from "@angular/router";


@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    imports: [
        NgForOf,
        NgIf,
        ButtonModule,
        DividerModule,
        DialogModule,
        ChipsModule,
        FormsModule,
        JsonPipe,
        CardModule
    ],
    standalone: true
})
export class CommentComponent implements OnInit{
    @Input() list2! : any[];
    @Output()  recursiveTetikleme = new EventEmitter<number>();


    display: boolean = false;

    replay : Comment = {};

    text! : string;

    user!: User;
    selcom!: Comment;

    showDialog(comment : any) {
        console.log(comment)
        this.selcom = comment;
        this.display = true;
    }


    constructor(private productService:ProductService,private router:Router) {

    }

    ngOnInit(): void {
        // @ts-ignore
        let userId = Number(JSON.parse(localStorage.getItem('userType')));

        this.productService.getUserById(userId).subscribe(v=>{
            this.user = v;
        });

    }

    saveReplay() {

        console.log(this.selcom)
        this.replay.parent = this.selcom.id;
        this.replay.user = this.user;
        this.replay.comment= this.text;
        this.replay.product=this.selcom.product;

        this.productService.saveComment(this.replay).subscribe(
            v=>{},
            error => {},
            (complete:void) =>{this.recursiveTetikleme.emit(this.selcom.product?.id)}
        )

        this.display=false;

    }
}
