import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private localStorageService:LocalStorageService
    ) { }

    ngOnInit():  void {
      this.createLoginForm();
    }
  
    createLoginForm(){
      this.loginForm = this.formBuilder.group({
        email: ["",Validators.required],
        password:["",Validators.required]
      })
    }
  
    login(){
      if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value)
  
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success("Giriş yapıldı", "Başarılı")
        this.localStorageService.set("token",response.data.token)
        this.localStorageService.set("email",this.loginForm.value.email)
        window.location.assign("cars")
      },responseError=>{
        this.toastrService.error(responseError.error)
      })    
      }else{
        this.toastrService.error("Lütfen boş bırakmayızın")
      }
    }   
    }
