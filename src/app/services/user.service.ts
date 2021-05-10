import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44349/api/users/"
getByEmail(email:string):Observable<User>{
  return this.httpClient.get<User>(this.apiUrl+"email?email="+email)
}

profileUpdate(user:User):Observable<ResponseModel>{
  console.log(user)
  return this.httpClient.post<ResponseModel>(this.apiUrl + 'updateprofile', {
    user:{
      'id': user.id,
      'firstName': user.firstName,
      'lastName': user.lastName,
      'email': user.email,
      'status':user.status
    },
    password:user.password
  });
}
}
// getByEmail(email:string):Observable<User>{
//   let newPath=this.apiUrl + "users/email?email="+email
//   return this.httpClient.get<User>(newPath)
// }