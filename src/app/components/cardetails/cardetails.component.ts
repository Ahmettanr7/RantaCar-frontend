import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit {
  brand:Brand;
  cars:Car[]=[];
  car:Car;
  currentBrand:Brand;
  imgUrl ="https://localhost:44349/";
  defaultImage="Images/default.JPG";

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
      }else{
        this.getCarDetails();
      }
    })
  }

  getCarDetails(){
    this.carService.getCarDetails().subscribe(response => {
    this.cars = response.data;
    })
  }
  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response =>{
      this.cars = response.data
    })
  }
  
  setCurrentBrand(brand:Brand){
    this.currentBrand = brand; 
  }
}