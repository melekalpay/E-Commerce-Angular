import {Urun} from "./urun";
import {User} from "./user";

export interface Basket {
    id?:number;
    product?:Urun;
    quantity?:number;
    user?:User;
}
