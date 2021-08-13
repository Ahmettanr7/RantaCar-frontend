import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil-update',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
profileForm:FormGroup
customerForm: FormGroup
email:string
password:FormControl
user:User = new User();
status:string;
customer:Customer;



  constructor(
              private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private userService:UserService
              ) { }

  ngOnInit(): void {
    this.createProfileAddForm();
    this.email = localStorage.getItem("email")
    this.getUser();
  }

  createProfileAddForm(){
    this.profileForm=this.formBuilder.group({
      id:this.user.id,
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
      status:true

    })
  }
  getUser(){
    if(this.email){
      this.userService.getByEmail(this.email).subscribe(response=>{
        this.user = response
        if(response.status){
          this.status = "Aktif"
        }else{
          this.status = "Aktif değil"
        }
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }
  updateProfile(){
    if(this.profileForm.valid){
      let profileModel = Object.assign({},this.profileForm.value)
      this.userService.profileUpdate(profileModel).subscribe(response=>{
        this.toastrService.success(response.message);
      },responseError=>{
       this.toastrService.error(responseError.error);
      });
    }else{
      this.toastrService.error("Formu Boş Bıraktınız")
    }
  }



}