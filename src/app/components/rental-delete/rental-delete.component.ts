import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-delete',
  templateUrl: './rental-delete.component.html',
  styleUrls: ['./rental-delete.component.css']
})
export class RentalDeleteComponent implements OnInit {

  rentalDeleteForm : FormGroup;
  rental:Rental
    id:number;

  constructor(
    private rentalService:RentalService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => { 
      if(params["id"]){
        this.getById(params["id"])
        this.createRentalForm();
      }
    })
  }

  getById(id:number){
    this.rentalService.getByIdSingle(this.activatedRoute.snapshot.params["id"]).subscribe(response=>{
      this.rental = response.data
      this.id = this.rental.id
    })
  }

  createRentalForm(){
    this.rentalDeleteForm = this.formBuilder.group({
      id:["",Validators.required]
    })
  }
  delete(){
    if(this.rentalDeleteForm.valid){
      let rentalModel = Object.assign({}, this.rentalDeleteForm.value);
      this.rentalService.delete(rentalModel).subscribe(response=>{
        this.toastrService.success("Kiralama silindi","Başarılı")
        this.backToList();
      },(responseError)=>{
        this.toastrService.error(responseError.error.message,'İşlem başarısız');
      }
      );
  }else{
    this.toastrService.error('Formunuz eksik', 'Dikkat')
  }
}
backToList(){
  this.router.navigate(["rentals/list"])
}
}
