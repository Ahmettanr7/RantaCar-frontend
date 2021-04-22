export interface RentalDetailDto{
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