import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalDeleteComponent } from './components/rental-delete/rental-delete.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { RentalUpdateComponent } from './components/rental-update/rental-update.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  //HOMEPAGE
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:id", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/brand/:id/color/:colorId",component:CarComponent},
  //CAR
  {path:"cars/list", component:CarListComponent, canActivate:[LoginGuard]},
  {path:"cars/list/add", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/list/update/:id", component:CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"cars/list/delete/:id", component:CarDeleteComponent, canActivate:[LoginGuard]},
  //BRAND
  {path:"brands/list", component:BrandListComponent, canActivate:[LoginGuard]},
  {path:"brands/list/add", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"brands/list/update/:id", component:BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"brands/list/delete/:id", component:BrandDeleteComponent, canActivate:[LoginGuard]},
  //COLOR
  {path:"colors/list", component:ColorListComponent, canActivate:[LoginGuard]},
  {path:"colors/list/add", component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"colors/list/update/:id", component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"colors/list/delete/:id", component:ColorDeleteComponent, canActivate:[LoginGuard]},
  //RENTAL
  {path:"rentals/list",component:RentalListComponent, canActivate:[LoginGuard]},
  {path:"rentals/list/update/:id",component:RentalUpdateComponent, canActivate:[LoginGuard]},
  {path:"rentals/list/delete/:id",component:RentalDeleteComponent, canActivate:[LoginGuard]},
  //DETAILS
  {path:"details/:carId", component:CardetailsComponent},
  {path:"details/payment/:id",component:PaymentComponent},
  //PROFIL
  {path:"profil",component:ProfilComponent},
  //LOGIN-REGISTER
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
