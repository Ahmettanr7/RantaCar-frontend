export interface Rental{
    id:number;
    userId:number;
    carId:number;
    rentDate:Date;
    returnDate?:Date;
}