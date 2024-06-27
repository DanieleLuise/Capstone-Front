import { Component } from '@angular/core';
import { IUser } from '../../models/i-user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData:Partial<IUser> = {
    firstName:"daniele",
    lastName:"luise",
    username:"kekw",
    email:"luise@gmai.com",
    citta: "Napoli",
    codiceFiscale:"daddy",
    password: "password123"
  }

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

  signUp(){
    this.authSvc.register(this.registerData)
    .subscribe(data => {

      this.router.navigate([''])

    })
  }

}
