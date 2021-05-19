import { CarImage } from "./carImage";

export class Car{
    id:number;
    brandId:number;
    colorId:number;
    carImageId:number;  
    carName:string;
    brandName:string;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
    gearType:string;
    enginePower:string;
    fuelType:string;
    description:string;
    carImage:CarImage[];
}