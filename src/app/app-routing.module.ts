import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { EquipementComponent } from './equipement/equipement.component';
import { OperationComponent } from './operation/operation.component';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'equipement', component: EquipementComponent },
  { path: 'operation', component: OperationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
