import {Rol} from "./rol";

export interface User{
    id?:number;
    username?:string;
    password?:string;
    rol?:Rol;


}
