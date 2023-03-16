
import {User} from "./user";
import {Urun} from "./urun";

export interface Comment {
    id?:number;
    comment?:String;
    parent?:number;
    user?:User;
    product?:Urun;
}
