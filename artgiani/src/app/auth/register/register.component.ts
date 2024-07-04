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
  registerData:Partial<IUser> = {}
  selectedFile: File | null = null;

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

    signUp() {
      this.authSvc.register(this.registerData).subscribe({
        next: (data) => {
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Errore durante la registrazione', err);
        }
      });
    }


    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }

}
