import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44349/api/rentals/"

  constructor(private httpClient:HttpClient) { }
  getRentals():Observable<ListResponseModel<RentalDto>>{
    let newPath = this.apiUrl + "getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }
  getRentalDetailsByCarId(carId:number):Observable<ListResponseModel<RentalDto>>{
    let newPath = this.apiUrl + "getrentaldetailsbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath)
  }
  getRentalDetailsByCarIdSingle(carId:number):Observable<SingleResponseModel<RentalDto>>{
    let newPath = this.apiUrl + "getrentaldetailsbycarid?carId="+carId
    return this.httpClient.get<SingleResponseModel<RentalDto>>(newPath)
  }
  getById(id:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "getbyid?id="+id
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }
  getByIdSingle(id:number):Observable<SingleResponseModel<Rental>>{
    let newPath = this.apiUrl + "getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath)
  }
  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add", rental)
  }
  update(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update", rental)
  }
  delete(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete", rental)
  }
}
