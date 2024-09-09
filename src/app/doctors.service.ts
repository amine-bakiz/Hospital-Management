import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from './doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  addDocURL : string;
  getDocURL : string;
  updateDocURL : string;
  deleteDocURL : string;

  constructor(private hhtp: HttpClient) {
    this.addDocURL = 'http://localhost:8080/doctors/addDoctor';
    this.getDocURL = 'http://localhost:8080/doctors/getAllDoctors';
    this.updateDocURL = 'http://localhost:8080/doctors/updateDoctor';
    this.deleteDocURL = 'http://localhost:8080/doctors/deleteDoctorById';
   }

  addDoctor(doc : Doctor): Observable<Doctor>{
    return this.hhtp.post<Doctor>(this.addDocURL,doc);
   }

  getAllDoctors(): Observable<Doctor[]>{
    return this.hhtp.get<Doctor[]>(this.getDocURL);
   }
  
  updateDoctor(doc : Doctor): Observable<Doctor>{
    return this.hhtp.put<Doctor>(this.updateDocURL,doc);
  }

  deleteDoctor(doc : Doctor): Observable<Doctor>{
    return this.hhtp.delete<Doctor>(this.deleteDocURL +'/'+ doc.matricule);
  }



}
