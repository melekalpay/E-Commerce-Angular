import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";


@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    imports: [
        NgForOf,
        NgIf
    ],
    standalone: true
})
export class CommentComponent implements OnInit{
    @Input() list2! : any[];

    list : any[] =  [
        { id: 1, title: "Teknoloji", parent_id: 0 },
        { id: 2, title: "Giyim", parent_id: 0 },
        { id: 3, title: "Pet", parent_id: 0 },
        { id: 4, title: "Bilgisayar", parent_id: 1 },
        { id: 5, title: "Telefon", parent_id: 1 },
        { id: 6, title: "Erkek", parent_id: 2 },
        { id: 7, title: "Kadın", parent_id: 2 },
        { id: 8, title: "Kedi", parent_id: 3 },
        { id: 9, title: "Köpek", parent_id: 3 },
        { id: 10, title: "Ayakkabı", parent_id: 6 }

    ];

    list1!: any[];

    recursivefunc2(list : any, id : 0) {
        let array : any[]= [];
        this.list.forEach(element => {
            if (element.parent_id === id) {
                let children = this.recursivefunc2(this.list, element.id);

                if (children.length) {
                    element.children = children;
                } else {
                    element.children = [];
                }
                array.push(element);
            }
        })
        return array;
    }


    constructor() {

    }

    ngOnInit(): void {
        this.list1 = this.recursivefunc2(this.list,0);
    }

}
