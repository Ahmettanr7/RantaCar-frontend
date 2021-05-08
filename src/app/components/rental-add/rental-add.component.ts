import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';

import { ResponseModel } from 'src/app/models/responseModel';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
  providers: [DatePipe],
})
export class RentalAddComponent implements OnInit {
  car:Car;
  customers: Customer[]
  rentDate: Date;
  returnDate: Date;
  customerId:number;
  minDate: string | any;
  maxDate: string | null;
  firstDateSelected: boolean = false;
  dateAvailable : ResponseModel;
  rental: Rental = {
    carId:0,
    customerId:0,
    rentDate: new Date(),
    returnDate: new Date(),
    brandName:"",
    carName:"",
    colorName:"",
    customerName:"",
    dailyPrice:0,
    rentalId:0,
    totalPrice:0,
    totalRentDay:0,
    userId:0,
    userName:""
  }
  

  constructor(
    private customerService: CustomerService,
    private carService: CarService,
    private datePipe: DatePipe,
    private toastrService : ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
        this.getCarDetailsByCarId(params["carId"])
        this.getCustomer();
    })
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }
  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }
  getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }
  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe((response)=> {
      this.car = response.data[0]
    })
  }
  calculatePrice() {
    if (this.returnDate) {
      let returnDate = new Date(this.returnDate.toString())
      let rentDate = new Date(this.rentDate.toString())

      let returnDay = Number.parseInt(returnDate.getDate().toString())
      let rentDay = Number.parseInt(rentDate.getDate().toString())

      let returnMonth = Number.parseInt(returnDate.getMonth().toString())
      let rentMonth = Number.parseInt(rentDate.getMonth().toString())

      let returnYear = Number.parseInt(returnDate.getFullYear().toString())
      let rentYear = Number.parseInt(rentDate.getFullYear().toString())

      let result = ((returnDay - rentDay) + ((returnMonth - rentMonth) * 30) + ((returnYear - rentYear) * 365)) * this.car.dailyPrice

      if (result > 0) {
        return result;
      }
      this.toastrService.info("Bu tarihler arasında arabayı kiralayamazsınız", "Geçersiz tarih seçimi")
      return 0

    }
    
    else {
      return this.car.dailyPrice;
    }
  }
  addRental() {
    let RentalModel = {
      customerId: this.customerId,
      carId: this.car.id,
      rentDate: this.rentDate,
      returnDate: this.returnDate
    };
    this.router.navigate(["details/payment/", JSON.stringify(RentalModel)]);
    this.toastrService.success("Ödeme sayfasına yönlendiriliyorsunuz.", "Başarılı işlem");
  }
  setCustomerId(customerId: any) {
    this.customerId = customerId;
    console.log(customerId);
  }
  selectCarId(){
return this.car.id
  }

}