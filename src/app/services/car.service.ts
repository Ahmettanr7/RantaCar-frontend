import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44349/api/";

  constructor(private httpClient:HttpClient) { }
  getCarDetails():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getByBrandId(id:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbybrandid?id="+id
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

}
