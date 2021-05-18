import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { FavoriteService } from 'src/app/services/favorite.service';

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


  constructor(
    private carService:CarService, 
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private favoriteService:FavoriteService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetails();
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
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
      this.car = response.data[0]
    })
  }
  
  setCurrentBrand(brand:Brand){
    this.currentBrand = brand; 
  }
  addToFavorite(car:Car){
    this.favoriteService.addToFavorite(car);
  }
}