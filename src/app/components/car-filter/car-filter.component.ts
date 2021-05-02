import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  selectedBrand:string=null;
  selectedColor:string=null;
  brands:Brand[];
  colors:Color[];

  constructor(private brandService:BrandService,
    private colorService:ColorService,
    ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColor();
  }
  checkFilterClass()
  {
    if(this.selectedBrand||this.selectedColor)
    {
      return "btn btn-primary"
    }
    else
    {
      return "btn btn-primary disabled"
    }
  }
  routingLink()
  {
    if(this.selectedBrand&&this.selectedColor)
    {
      return "/cars/brand/"+this.selectedBrand+"/color/"+this.selectedColor;
    }
     if(this.selectedColor)
    {
      return "/cars/color/"+this.selectedColor
      
    }
    if(this.selectedBrand)
    {

      return "cars/brand/"+this.selectedBrand
    }
    else{

    return "/cars"
    }
  }
  getBrands()
  {
    this.brandService.getBrands().subscribe((response)=>
    {
      this.brands=response.data;
    })
  }
  getColor()
  {
    this.colorService.getColor().subscribe((response)=>
    {
      this.colors=response.data;
    })
  }

}