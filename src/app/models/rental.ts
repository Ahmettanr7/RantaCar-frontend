export interface Rental{
    rentalId:number;
    carName:string;
    userName:string;
    customerName:string;
    rentDate:Date;
    returnDate?:Date;
    dailyPrice:number;
    totalRentDay:number;
    totalPrice:number;
}