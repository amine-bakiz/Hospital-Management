import { Component } from '@angular/core';
import { User } from '../user';
import { LoginuserService } from '../loginuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {

  user:User = new User();
  constructor(private loginuserservice: LoginuserService,private router: Router) {}
  Login() {
    this.loginuserservice.loginUser(this.user).subscribe(data=>{
      alert("Login Successfully")
      this.router.navigate(['/home']);
    },error=>alert("Please enter correct username and password"));
    }
  

}
