import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Doctor } from '../doctor';
import { DoctorsService } from '../doctors.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent {

  docDetail!: FormGroup;
  docObj : Doctor = new Doctor();
  docList : Doctor[]= [];

  constructor(private formBuilder : FormBuilder, private docService : DoctorsService ){}

  ngOnInit(): void{
    this.getAllDoctors();
    this.docDetail = this.formBuilder.group({
      matricule : [''],
      nom : [''],
      prenom : [''],
      image : ['']

    });
  }
  addDoctor() {
    this.docObj.matricule = this.docDetail.value.matricule;
    this.docObj.nom = this.docDetail.value.nom;
    this.docObj.prenom = this.docDetail.value.prenom;
    this.docObj.image = this.docDetail.value.image;

    this.docService.addDoctor(this.docObj).subscribe(res=>{
      console.log(res);
      this.getAllDoctors();
    },err=>{
      console.log(err);
    });  
  }

  getAllDoctors(){
    this.docService.getAllDoctors().subscribe(res=>{
      this.docList = res;
      console.log(res);
    },err=>{
      console.log("erreur");
    });
  }

  updateDoctor() {
    this.docObj.matricule = this.docDetail.value.matricule;
    this.docObj.nom = this.docDetail.value.nom;
    this.docObj.prenom = this.docDetail.value.prenom;
    this.docObj.image = this.docDetail.value.image;

    this.docService.updateDoctor(this.docObj).subscribe(res=>{
      console.log(res);
      this.getAllDoctors();
    },err=>{
      console.log(err);
    });

  }  

  deleteDoctor(doc : Doctor) {
    console.log('Deleting doctor:', doc);
    this.docService.deleteDoctor(doc).subscribe(res=>{
      console.log(res);
      alert('Doctor deleted successfully');
      this.getAllDoctors();
    },err=>{
      console.log(err);
    });
  }

  editDoctor(doc : Doctor) {
      this.docDetail.controls['matricule'].setValue(doc.matricule);
      this.docDetail.controls['nom'].setValue(doc.nom);
      this.docDetail.controls['prenom'].setValue(doc.prenom);
  }  
}
