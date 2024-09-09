import { Component, OnInit, inject } from '@angular/core';
import { Operation } from '../operation';
import { Patient } from '../patient';
import { Doctor } from '../doctor';
import { Equipement } from '../equipement';
import { OperationService } from '../operation.service';
import { PatientService } from '../patient.service';
import { DoctorsService } from '../doctors.service';
import { EquipementService } from '../equipement.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.scss'
})
export class OperationComponent implements OnInit{


    operations: Operation[] = [];
    operation : Operation = new Operation();
    patients : Patient[] = [];
    doctors : Doctor[] = [];
    equipements : Equipement[] = [];
    from !: FormGroup
    formBuilder: FormBuilder = new FormBuilder();
    dropdownList: any;
    dropdownSettings: any;
    equip: Equipement[]  = [];
   
  
    constructor(private opeartionService : OperationService,private patientService : PatientService,private doctorService : DoctorsService,private equipementService : EquipementService){}
    
    ngOnInit():void {
      this.getOperation();
      this.getAllDoctors();
      this.getPatients();
      this.getEquipement();
      this.from = this.formBuilder.group({
        salle : [''],
        dateDebut : [''],
        patient : [''],
        doctor : [''],
        equi :  [[]] 
      });
      this.dropdownSettings = {
        singleSelection : false,
        idField : 'id',
        textField : 'nom',
        SelectAllText : 'Select All',
        unSelectAllText : 'UnSelect All',
  
      };
     
    }

    getOperation(){
      this.opeartionService.getAllOperations().subscribe(data =>{
        this.operations = data;
      })
    }
    getPatients(){
      this.patientService.getAllPatients().subscribe(data =>{
        this.patients = data;
      })
    }
 
    getAllDoctors(){
      this.doctorService.getAllDoctors().subscribe(res=>{
        this.doctors = res;
      

      },err=>{
        console.log("erreur");
      });
    }
    getEquipement(){
      this.equipementService.getAllEquipements().subscribe(data =>{
        this.equipements = data;
        this.dropdownList = data.map(equipement => ({
          id: equipement.id,
          nom: equipement.nom
        }));
      });
    }

    onSubmit(){
      console.log(this.from.value);
        
        let op : Operation = {
        pat: this.patients.filter(p => p.nom == this.from.value["patient"])[0],
        equi: this.from.value.equi,
        dateoperation: new Date(this.from.value['dateDebut']),
        salle: this.from.value["salle"],
        med: this.doctors.filter(d => d.nom === this.from.value["doctor"])[0]
      }

      this.opeartionService.addOperation(op).subscribe({
        next : (res  : Operation) => {
          this.operations.push(res);
          this.from.reset();
        },
        error: (err) =>{
          console.error(err);
          alert('Already an Operation exists in this Date ');
        }
      });

    

      console.log(this.dropdownList);
    }
   
    deleteOpeartion(ope: Operation) {
      console.log('Deleting Opeartion:', ope);
      this.opeartionService.deleteOperation(ope).subscribe(res=>{
        console.log(res);
        alert('Operation deleted successfully');
        this.getOperation();
      },err=>{
        console.log(err);
      });
    }

    generatePDF(operation: any) {
      let doc = new jsPDF();
    
      // Set title
      doc.setFontSize(24);
      doc.setTextColor(0, 0, 255); // Set text color to blue
      doc.text('Operation Information :', 10, 10);
    
       // Reset text color to black
    
      doc.setFontSize(16);

  // Set color for the "Date" text
      doc.setTextColor(255, 0, 0); // Set text color to red
      doc.text('Date: ', 10, 20);
      doc.setTextColor(0, 0, 0); // Reset text color to black
      doc.text(`-${operation.dateoperation}`, 50, 20);
      doc.setTextColor(255, 0, 0);
      doc.text('Salle: ', 10, 30);
      doc.setTextColor(0, 0, 0);
      doc.text(`-${operation.salle}`, 50, 30);
      doc.setTextColor(255, 0, 0);
      doc.text('Patient Name: ', 10, 40);
      doc.setTextColor(0, 0, 0);
      doc.text(`-${operation.pat.nom}`, 50, 40);
      doc.setTextColor(255, 0, 0);
      doc.text('Doctor Name: ', 10, 50);
      doc.setTextColor(0, 0, 0);
      doc.text(`-${operation.med.nom}`, 50, 50);
    
      // Loop through equipment and add to PDF
      let yPosition = 60;
      let equipmentsTitleShown = false;
      
      operation.equi.forEach((equipment: any) => {
        if (!equipmentsTitleShown) {
          doc.setTextColor(255, 0, 0); // Set text color to red for "Equipments:"
          doc.text('Equipments:', 10, yPosition);
          doc.setTextColor(0, 0, 0); // Reset text color to black
          equipmentsTitleShown = true; // Set flag to indicate that the title has been shown
          yPosition += 10;
        }
      
        doc.text(`- ${equipment.nom}`, 50, yPosition); // Adjust the x position based on your preference
        yPosition += 10;
      });
      

    
      // Save the PDF
      doc.save('operation_info.pdf');
    }
    
    
    
   
    
    
  
}
