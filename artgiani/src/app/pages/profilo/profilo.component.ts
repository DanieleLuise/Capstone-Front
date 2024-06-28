import { UserService } from './../../services/user-service';
import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/i-user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent implements OnInit{
  user: IUser | null = null;
  selectedFile: File | null = null;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserProfile();
    this.authService.user$.subscribe(user => this.user = user);
  }

  updateProfile() {
    if (this.user) {
      this.userService.updateProfile(this.user.id, this.user).subscribe(updatedUser => {
        this.user = updatedUser;
        this.authService.updateLocalUser(updatedUser);
      });
    }

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.user && this.selectedFile) {
      this.userService.uploadAvatar(this.user.id, this.selectedFile).pipe(
        tap(response => {
          if (this.user) {
            this.user.avatar = response.url;
          }
        })
      ).subscribe({
        next: (response) => {
          if (this.user) {
            this.user.avatar = response.url;
            console.log('Avatar aggiornato con successo.');
          }
        },
        error: (error) => {
          console.error('Errore durante il caricamento dell\'avatar', error);
        }
      });
    }
  }

onSave(): void {
  if (this.user) {
    this.userService.updateProfile(this.user.id, this.user).subscribe(
      updatedUser => {
        this.user = updatedUser;
      },
      error => {
        console.error('Errore durante l\'aggiornamento del profilo', error);
      }
    );
  }
}

}
