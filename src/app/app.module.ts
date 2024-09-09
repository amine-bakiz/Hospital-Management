import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { EquipementComponent } from './equipement/equipement.component';
import { OperationComponent } from './operation/operation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './search.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    HomeComponent,
    DoctorsComponent,
    PatientsComponent,
    EquipementComponent,
    OperationComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
