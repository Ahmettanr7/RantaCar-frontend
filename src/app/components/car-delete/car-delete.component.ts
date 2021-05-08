import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {

  carDeleteForm:FormGroup;
  car:Car;
  id:number;
  carName:string;

  constructor(private carService:CarService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService:ToastrService) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => { 
        if(params["id"]){
          this.getCarDetailsByCarId(params["id"])
          this.createCarForm();
        }
      })
    }

  getCarDetailsByCarId(id:number){
    this.carService.getCarDetailsByCarIdSingle(this.activatedRoute.snapshot.params["id"]).subscribe(response=>{
      this.car = response.data
      this.id = this.car.id
      this.carName = this.car.carName
    })
  }

  createCarForm(){
    this.carDeleteForm = this.formBuilder.group({
      id:["",Validators.required],
    });
  }

  delete(){
    if (this.carDeleteForm.valid) {
      let carModel = Object.assign({}, this.carDeleteForm.value);
      this.carService.delete(carModel).subscribe(response=>{
        this.toastrService.success("Araç silindi","Başarılı")
        this.backToList();
      }
      ,
      (responseError)=>
      {
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      }
      );
    } 
    else {
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
  backToList(){
    this.router.navigate(["cars/list"]);
  }

}