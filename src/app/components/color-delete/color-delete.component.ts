import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css']
})
export class ColorDeleteComponent implements OnInit {
  
  colorDeleteForm : FormGroup;
  color:Color;
  id:number;
  colorName:string;

  constructor(private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
      if(params["id"]){
        this.getByColorId(params["id"])
        this.createColorForm();
      }
    })
  }

  getByColorId(id:number){
    this.colorService.getByColorId(this.activatedRoute.snapshot.params["id"]).subscribe(response=>{
      this.color = response.data
      this.id =this.color.id
      this.colorName = this.color.colorName
    })
  }

  createColorForm(){
    this.colorDeleteForm = this.formBuilder.group({
      id:["",Validators.required]
    });
  }

  delete(){
    if (this.colorDeleteForm.valid) {
      let colorModel = Object.assign({}, this.colorDeleteForm.value);
      this.colorService.delete(colorModel).subscribe(response=>{
        this.toastrService.success("Renk silindi","Başarılı")
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
    } else {
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
  backToList(){
    this.router.navigate(["colors/list"]);
  }

}
