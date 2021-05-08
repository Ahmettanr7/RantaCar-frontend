import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllcarsComponent } from './components/allcars/allcars.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:id", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/details/:id", component:AllcarsComponent},

  {path:"cars/list", component:CarListComponent},
  {path:"cars/list/add", component:CarAddComponent},
  {path:"cars/list/update/:id", component:CarUpdateComponent},
  {path:"cars/list/delete/:id", component:CarDeleteComponent},

  {path:"brands/list", component:BrandListComponent},
  {path:"brands/list/add", component:BrandAddComponent},
  {path:"brands/list/update/:id", component:BrandUpdateComponent},
  {path:"brands/list/delete/:id", component:BrandDeleteComponent},

  {path:"colors/list", component:ColorListComponent},
  {path:"colors/list/add", component:ColorAddComponent},
  {path:"colors/list/update/:id", component:ColorUpdateComponent},
  {path:"colors/list/delete/:id", component:ColorDeleteComponent},

  {path:"details/:carId", component:CardetailsComponent},
  {path:"cars/brand/:id/color/:colorId",pathMatch:"full",component:CarComponent},

  {path:"details/payment/:rental",component:PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
