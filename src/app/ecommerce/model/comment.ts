
import {User} from "./user";

export interface Comment {
    id?:number;
    comment?:String;
    parent?:number;
    user?:User;
}
