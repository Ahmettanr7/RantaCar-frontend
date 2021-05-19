export interface RentalDto{
    rentalId:number;
    carId:number;
    userId:number;
    brandName:string;
    carName:string;
    colorName:string;
    userName:string;
    rentDate:Date;
    returnDate?:Date;
    dailyPrice:number;
    totalRentDay:number;
    totalPrice:number;
}