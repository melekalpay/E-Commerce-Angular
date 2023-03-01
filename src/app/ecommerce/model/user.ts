import {Rol} from "./rol";

export interface User{
    id?:number;
    name?:string;
    password?:string;
    rol?:Rol;


}
