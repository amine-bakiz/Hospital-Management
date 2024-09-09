import { Component } from '@angular/core';
import { EquipementService } from '../equipement.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Equipement } from '../equipement';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrl: './equipement.component.scss'
})
export class EquipementComponent {
  equDetail!: FormGroup;
  equObj : Equipement = new Equipement();
  equList : Equipement[]= [];

  constructor(private formBuilder : FormBuilder, private equService : EquipementService ){}

  ngOnInit(): void{
    this.getAllEquipements();
    this.equDetail = this.formBuilder.group({
      id : [''],
      nom : [''],
      quantite : [''],
    });
  }
  addEquipement() {
    this.equObj.nom = this.equDetail.value.nom;
    this.equObj.quantite = this.equDetail.value.quantite;


    this. equService.addEquipement(this.equObj).subscribe(res=>{
      console.log(res);
      this.getAllEquipements();
    },err=>{
      console.log(err);
    });  
  }

  getAllEquipements(){
    this.equService.getAllEquipements().subscribe(res=>{
      this.equList = res;
    },err=>{
      console.log("erreur");
    });
  }

  updateEquipement() {
    // Ensure there is a valid name before updating
    const updatedNom = this.equDetail.value.nom;
    if (updatedNom) {
      console.log('Updating equipment with name:', updatedNom);
  
      // Create a new object with updated values, including the name
      const updatedEquipement: Equipement = {
        id: this.equObj.id,
        nom: updatedNom,
        quantite: this.equDetail.value.quantite
      };
  
      // Call the equipementService to update the equipment
      this.equService.updateEquipement(updatedEquipement).subscribe(
        res => {
          console.log(res);
          this.getAllEquipements();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      console.error('Invalid equipment name');
    }
  }
  
  
  
  

  deleteEquipement(equ : Equipement) {
    console.log('Deleting Equipement:', equ);
    this.equService.deleteEquipement(equ).subscribe(res=>{
      console.log(res);
      alert('Equipement deleted successfully');
      this.getAllEquipements();
    },err=>{
      console.log(err);
    });
  }

  editEquipement(equ : Equipement) {
      this.equDetail.controls['nom'].setValue(equ.nom);
      this.equDetail.controls['quantite'].setValue(equ.quantite);
  }  

}
