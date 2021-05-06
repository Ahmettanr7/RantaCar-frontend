export interface Rental{
    rentalId:number;
    customerId:number;
    userId:number;
    carId:number;
    carName:string;
    brandName:string;
    colorName:string;
    userName:string;
    customerName:string;
    rentDate:Date;
    returnDate?:Date;
    dailyPrice:number;
    totalRentDay:number;
    totalPrice:number;
}