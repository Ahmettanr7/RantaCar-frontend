import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44349/api/cars/";

  constructor(private httpClient:HttpClient) { }
  getCarDetails():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getByBrandId(id:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "getbybrandid?id="+id
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "getcardetailsbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarDetailsByColorId(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "getcardetailsbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

}
