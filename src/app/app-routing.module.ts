import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllcarsComponent } from './components/allcars/allcars.component';
import { CarComponent } from './components/car/car.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:id", component:CarComponent},
  {path:"cars/details/:id", component:AllcarsComponent},
  {path:"details/:carId", component:CardetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
