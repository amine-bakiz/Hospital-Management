import { ChangeDetectorRef, Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Patient } from '../patient';
import {MatTableDataSource} from '@angular/material/table';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {

  patDetail!: FormGroup;
  patObj : Patient = new Patient();
  patList : Patient[]= [];
  datasource = new MatTableDataSource(this.patList);
  filterFormControl = new FormControl();
  searchText = '';

  constructor(private formBuilder : FormBuilder, private patService : PatientService ){
  }

  ngOnInit(): void{
    this.getAllPatients();
    this.patDetail = this.formBuilder.group({
      cin : [''],
      nom : [''],
      prenom : [''],
      age : [''],
      sexe : [''],
    });

    
  }
  
  addPatient() {
    this.patObj.cin = this.patDetail.value.cin;
    this.patObj.nom = this.patDetail.value.nom;
    this.patObj.prenom = this.patDetail.value.prenom;
    this.patObj.age = this.patDetail.value.age;
    this.patObj.sexe = this.patDetail.value.sexe;

    this.patService.addPatient(this.patObj).subscribe(res=>{
      console.log(res);
      this.getAllPatients();
    },err=>{
      console.log(err);
    });  
  }

  getAllPatients(){
    this.patService.getAllPatients().subscribe(res=>{
      this.patList = res;
    },err=>{
      console.log("erreur");
    });
  }

  updatePatient() {
    this.patObj.cin = this.patDetail.value.cin;
    this.patObj.nom = this.patDetail.value.nom;
    this.patObj.prenom = this.patDetail.value.prenom;
    this.patObj.age = this.patDetail.value.age;
    this.patObj.sexe = this.patDetail.value.sexe;
    this.patService.updatePatient(this.patObj).subscribe(res=>{
      console.log(res);
      this.getAllPatients();
    },err=>{
      console.log(err);
    });

  }  

  deletePatient(pat : Patient) {
    console.log('Deleting patient:', pat);
    this.patService.deletePatient(pat).subscribe(res=>{
      console.log(res);
      alert('Patient deleted successfully');
      this.getAllPatients();
    },err=>{
      console.log(err);
    });
  }

  editPatient(pat : Patient) {
      this.patDetail.controls['cin'].setValue(pat.cin);
      this.patDetail.controls['nom'].setValue(pat.nom);
      this.patDetail.controls['prenom'].setValue(pat.prenom);
      this.patDetail.controls['age'].setValue(pat.age);
      this.patDetail.controls['sexe'].setValue(pat.sexe);
  }  




  
}
