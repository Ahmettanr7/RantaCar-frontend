import { Byte } from "@angular/compiler/src/util";

export interface Customer{
    customerId:number;
    userId:number;
    companyName:string;
    firstName:string;
    lastName:string;
    email:string;
    passwordHash:Byte[];
    passwordSaly:Byte[];
    status:boolean;

}