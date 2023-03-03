import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../../demo/service/product.service";
import {Comment} from "../model/comment";
import {ButtonModule} from "primeng/button";


@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    imports: [
        NgForOf,
        NgIf,
        ButtonModule
    ],
    standalone: true
})
export class CommentComponent implements OnInit{
    @Input() list2! : any[];

    comments!: Comment[];


    list1!: any[];

    recursivefunc2(list : any, id : 0) {
        let array : any[]= [];
        this.comments.forEach(element => {
            if (element.parent === id) {
                // @ts-ignore
                let children = this.recursivefunc2(this.comments, element.id);
                if (children.length) {
                    // @ts-ignore
                    element.children = children;
                } else {
                    // @ts-ignore
                    element.children = [];
                }
                array.push(element);
            }
        })
        return array;
    }


    constructor(private commentService:ProductService) {

    }

    ngOnInit(): void {
        this.commentService.getAllComments().subscribe(value => {
            this.comments = value;
            console.log(this.comments)
        })

        this.list1=this.recursivefunc2(this.comments,0);

        console.log(this.list1)
    }

}
