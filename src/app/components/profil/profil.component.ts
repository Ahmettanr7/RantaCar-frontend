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
              private customerService:CustomerService,
              private authService:AuthService,
              private userService:UserService,
              private activatedRoute:ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.createProfileAddForm();
    this.email = localStorage.getItem("email")
    this.getUser();
    this.getCustomer();
    this.createCustomerForm();
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
  createCustomerForm(){
    this.customerForm=this.formBuilder.group({
      
      companyName:["",Validators.required],  
    })
  }
  getCustomer(){
    this.customerService.getByCustomerId(this.authService.getCurrentUserId()).subscribe(response => {
      this.customer = response.data
      this.customerForm.patchValue(response.data)
    })
  }
  updateCustomer(){
    if(this.customerForm.valid){  
    this.customerForm.addControl("id",new FormControl(this.customer.userId))
    let customerModel = Object.assign({},this.customerForm.value)
    
      this.customerService.update(customerModel).subscribe(response=>{
        this.toastrService.success(response.message)
      },errorResponse=>{
        this.toastrService.error("Hata")
      })
    }else{
      this.toastrService.error("Form boş bırakıldı","Uyarı")
    }
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