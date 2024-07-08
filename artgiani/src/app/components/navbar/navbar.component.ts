import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuCollapsed = true;
  isUserLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private authSvc: AuthService) { }

  show:boolean = false
  isCollapsed = false;

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
    });


  }

  logout() {
    this.authSvc.logout();
  }



}

