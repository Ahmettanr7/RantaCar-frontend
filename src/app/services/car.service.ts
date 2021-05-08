import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

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
  getCarDetailsByCarId(id:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "getcardetailsbycarid?id="+id
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarDetailsByCarIdSingle(id:number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "getbycarid?id="+id
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }
  getCarDetailsByColorId(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "getcardetailsbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add", car)
  }
  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update", car)
  }
  delete(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete", car)
  }

}
