import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.css']
})
export class RentalUpdateComponent implements OnInit {

  rentalUpdateForm : FormGroup;
  rental:Rental
  user:User;
  car:Car;
  cars:Car[]=[];
  users:User[]=[];
    id:number;
    carId:number;
    userId:number;
    rentDate:Date;
    returnDate?:Date;

  constructor(
    private carService:CarService,
    private userService:UserService,
    private rentalService:RentalService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
        this.getCarDetails();
        this.getUsers();
    this.activatedRoute.params.subscribe(params => {  
      if(params["id"]){
        this.getById(params["id"]);
        this.createRentalForm();
      }
    })
  }
  getCarDetails(){
    this.carService.getCarDetails().subscribe(response =>{
      this.cars = response.data
    })
  }
  getUsers(){
    this.userService.getUsers().subscribe(response =>{
      this.users = response.data
    })
  }
  getById(id:number){
    this.rentalService.getByIdSingle(this.activatedRoute.snapshot.params["id"]).subscribe(response =>{
      this.rental = response.data
      this.id = this.rental.id
      this.userId = this.rental.userId
      this.carId = this.rental.carId
      this.rentDate = this.rental.rentDate
      this.returnDate = this.rental.returnDate
    })
  }
  createRentalForm(){
    this.rentalUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      userId:["",Validators.required],
      carId:["",Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required],
    })
  }
  update(){
    if (this.rentalUpdateForm.valid) {
      let rentalModel = Object.assign({}, this.rentalUpdateForm.value);
      this.rentalService.update(rentalModel).subscribe(response=>{
        this.toastrService.success("Kiralama güncellendi","Başarılı")
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
    this.router.navigate(["rentals/list"])
  }

}
