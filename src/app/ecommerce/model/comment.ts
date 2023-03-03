
import {User} from "./user";
import {Product} from "../../demo/api/product";

export interface Comment {
    id?:number;
    comment?:String;
    parent?:number;
    user?:User;
    product?:Product;
}
