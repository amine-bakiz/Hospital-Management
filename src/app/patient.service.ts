import { Injectable } from '@angular/core';
import { Patient } from './patient';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  addPatURL : string;
  getPatURL : string;  
  updatePatURL : string;
  deletePatURL : string;

  constructor(private hhtp: HttpClient) {
    this.addPatURL = 'http://localhost:8080/patients/addPatient';
    this.getPatURL = 'http://localhost:8080/patients/getAllPatients';
    this.updatePatURL = 'http://localhost:8080/patients/updatePatient';
    this.deletePatURL = 'http://localhost:8080/patients/deletePatientById';
   }

  addPatient(pat : Patient): Observable<Patient>{
    return this.hhtp.post<Patient>(this.addPatURL,pat);
   }

  getAllPatients(): Observable<Patient[]>{
    return this.hhtp.get<Patient[]>(this.getPatURL);
   }

 
  updatePatient(pat : Patient): Observable<Patient>{
    return this.hhtp.put<Patient>(this.updatePatURL,pat);
  }

  deletePatient(pat : Patient): Observable<Patient>{
    return this.hhtp.delete<Patient>(this.deletePatURL +'/'+ pat.cin);
  }

}
