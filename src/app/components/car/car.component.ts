import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] = [];
  carImages:CarImage[] = [];
  dataLoaded = false;

  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCarDetails();
    this.getImages();
  }

  getCarDetails(){
    this.carService.getCarDetails().subscribe(response => {
    this.cars = response.data
    this.dataLoaded = true;
    })
  }
  getImages(){
    this.carService.getImages().subscribe(response => {
      this.carImages = response.data
      this.dataLoaded = true;
    })
  }

}
