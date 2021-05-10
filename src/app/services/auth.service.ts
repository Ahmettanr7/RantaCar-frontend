import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService} from "@auth0/angular-jwt";
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserId: number;
  jwtHelperService:JwtHelperService = new JwtHelperService();
  apiUrl="https://localhost:44349/api/auth/"

  constructor(
    private httpClient:HttpClient,
    private storageService:LocalStorageService,
    ) { }

  login(loginModel:Login){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  register(register:Register):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"register", register) 
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  setCurrentUserId(){
    var decoded = this.getDecodedToken()
    var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
    this.currentUserId = Number(decoded[propUserId]);
  }

  getCurrentUserId():number {
    return this.currentUserId
  }
  getDecodedToken(){
    try{
      return this.jwtHelperService.decodeToken(this.storageService.getToken());
    }
    catch(Error){
        return null;
    }
  }
  async setUserStats(){
    if(this.loggedIn()){
      this.setCurrentUserId()
      
    
    }
  }
  loggedIn(): boolean {
    let isExpired = this.jwtHelperService.isTokenExpired(this.storageService.getToken());
    return !isExpired;
  }
}

