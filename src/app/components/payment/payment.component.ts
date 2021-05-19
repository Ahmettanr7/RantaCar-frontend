import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  car:Car;
  carImages:CarImage;
  rental:Rental;
  rentalDto:RentalDto
  rentDate: Date;
  returnDate: Date;
  imgUrl ="https://localhost:44349/";
  defaultImage="Images/default.JPG";
  constructor(private carService:CarService, 
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private rentalService:RentalService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetailsByCarId(params["id"])
      this.getRentalDetailsByCarId(params["id"])
  })
}

getRentalDetailsByCarId(carId:number){
  this.rentalService.getRentalDetailsByCarId(carId).subscribe((response)=>{
    this.rentalDto = response.data.pop();
  })
}

  getCarDetailsByCarId(id:number){
    this.carService.getCarDetailsByCarId(id).subscribe((response)=> {
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
  payment(){
    this.toastrService.success("Araç kiralandı, iyi yolculuklar dileriz.","Ödeme başarılı")
    this.router.navigate(["cars"])
  }

}
