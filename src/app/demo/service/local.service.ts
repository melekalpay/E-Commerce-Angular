import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Urun} from "../../ecommerce/model/urun";

@Injectable({
    providedIn:'root'
})
export class LocalService {
    data! : Urun;
    constructor() { }


}
