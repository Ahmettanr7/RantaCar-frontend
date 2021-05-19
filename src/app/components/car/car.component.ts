import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { FavoriteItem } from 'src/app/models/favoriteItem';
import { FavoriteItems } from 'src/app/models/favoriteItems';
import { CarService } from 'src/app/services/car.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car [] = [];
  car:Car;
  carImages:CarImage[];
  dataLoaded:boolean = false;
  imgUrl ="https://localhost:44349/";
  defaultImage="Images/default.JPG";
  welcomeImage="Images/welcome.jpg";
  filterText="";

  constructor(
    private carService:CarService, 
    private activatedRoute:ActivatedRoute,
    private favoriteService:FavoriteService,
    private toastrService:ToastrService,
    private localstorageService:LocalStorageService,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
      }
      else if(params["colorId"]){
        this.getCarDetailsByColorId(params["colorId"])
      }
      else if(params["id"]){
        this.getByBrandId(params["id"])
      }
      else{
        this.getCarDetails();
      }
    })
  }

  getCarDetails(){
    this.carService.getCarDetails().subscribe(response => {
    this.cars = response.data;
    })
  }

  getByBrandId(id:number){
    this.carService.getByBrandId(id).subscribe(response => {
    this.cars = response.data;
    })
  }
  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response =>{
      this.cars = response.data
    })
  }
  getCarDetailsByColorId(colorId:number){
    this.carService.getCarDetailsByColorId(colorId).subscribe(response =>{
      this.cars = response.data
    })
  }

  addToFavorite(car:Car){
    this.favoriteService.addToFavorite(car);
    
  }
}