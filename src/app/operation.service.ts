import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Operation } from './operation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  addopURL : string;
  getopURL : string;
  deleteopURL : string;

  constructor(private hhtp: HttpClient) {
    this.addopURL = 'http://localhost:8080/operation/addOperation';
    this.getopURL = 'http://localhost:8080/operation/getAllOperation';
    this.deleteopURL = 'http://localhost:8080/operation/deleteOperationById';
   }

  addOperation(Equ : Operation): Observable<Operation>{
    return this.hhtp.post<Operation>(this.addopURL,Equ);
   }

  getAllOperations(): Observable<Operation[]>{
    return this.hhtp.get<Operation[]>(this.getopURL);
   }
  

  deleteOperation(Equ : Operation): Observable<Operation>{
    return this.hhtp.delete<Operation>(this.deleteopURL +'/'+ Equ.id);
  }
  
}  
