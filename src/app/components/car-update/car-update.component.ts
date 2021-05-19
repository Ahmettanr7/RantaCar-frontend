import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm : FormGroup;
  car:Car;
  cars:Car[]=[]
  brands:Brand[]=[];
  colors:Color[]=[]
    id:number;
    carName:string;
    brandId:number;
    colorId:number;
    modelYear:number;
    dailyPrice:number;
    gearType:string;
    enginePower:string;
    fuelType:string;
    description:string;

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private colorService:ColorService,
    private router:Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      
      if(params["id"]){
        this.getCarDetailsByCarId(params["id"])
        this.createCarForm();
        this.getBrands();
        this.getColor();
      }
    })
  }
  getColor(){
    this.colorService.getColor().subscribe(response =>{
      this.colors = response.data
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data
    })
  }

  getCarDetailsByCarId(id:number){
    this.carService.getCarDetailsByCarIdSingle(this.activatedRoute.snapshot.params["id"]).subscribe(response=>{
      this.car = response.data
      this.id = this.car.id
      this.carName = this.car.carName
      this.brandId = this.car.brandId
      this.colorId = this.car.colorId
      this.modelYear = this.car.modelYear
      this.dailyPrice = this.car.dailyPrice
      this.gearType = this.car.gearType
      this.enginePower = this.car.enginePower
      this.fuelType = this.car.fuelType
      this.description = this.car.description
    })
  }

  createCarForm(){
    this.carUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      carName:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required], 
      gearType:["",Validators.required],
      enginePower:["",Validators.required],
      fuelType:["",Validators.required],
      description:["",Validators.required]
    });
  }

  update(){
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success("Araç güncellendi","Başarılı")
        this.backToList();
      }
      ,
      (responseError)=>
      {
            this.toastrService.error(responseError.error.Message,"İşlem başarısız")
            console.log(responseError);
            
          
        
      }
      );
    } 
    else {
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

  backToList(){
    this.router.navigate(["cars/list"])
  }

}
