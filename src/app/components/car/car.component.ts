import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car [] = [];
  carImages:CarImage[] = [];
  dataLoaded:boolean = false;
  imgUrl ="https://localhost:44349/";
  defaultImage="Images/default.jpg";

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["id"]){
        this.getByBrandId(params["id"])
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

  getByBrandId(id:number){
    this.carService.getByBrandId(id).subscribe(response => {
    this.cars = response.data;
    })
  }

}
