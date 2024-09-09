import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipement } from './equipement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  addEquURL : string;
  getEquURL : string;
  updateEquURL : string;
  deleteEquURL : string;

  constructor(private hhtp: HttpClient) {
    this.addEquURL = 'http://localhost:8080/equipemets/addEquipemet';
    this.getEquURL = 'http://localhost:8080/equipemets/getAllEquipemets';
    this.updateEquURL = 'http://localhost:8080/equipemets/updateEquipemet';
    this.deleteEquURL = 'http://localhost:8080/equipemets/deleteEquipemetsById';
   }

  addEquipement(Equ : Equipement): Observable<Equipement>{
    return this.hhtp.post<Equipement>(this.addEquURL,Equ);
   }

  getAllEquipements(): Observable<Equipement[]>{
    return this.hhtp.get<Equipement[]>(this.getEquURL);
   }
  
  updateEquipement(Equ : Equipement): Observable<Equipement>{
    return this.hhtp.put<Equipement>(this.updateEquURL,Equ);
  }

  deleteEquipement(Equ : Equipement): Observable<Equipement>{
    return this.hhtp.delete<Equipement>(this.deleteEquURL +'/'+ Equ.id);
  }
}
