import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {

    private baseURl="http://localhost:8080/user/login";
    constructor(private httpclient: HttpClient) { }
  
    loginUser(user: User):Observable<object>{
      return this.httpclient.post(`${this.baseURl}`,user);
    }
}
