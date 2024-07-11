import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProdottoComponent } from './prodotto/prodotto.component';
import { CarrelloComponent } from '../carrello/carrello.component';
import { AuthGuard } from '../../auth/auth.guard';
import { GuestGuard } from '../../auth/guest.guard';
import { LoginComponent } from '../../auth/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'aggiungi', component:ProdottoComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'carrello', component:CarrelloComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},

  { path: 'auth/login', component: LoginComponent, canActivate: [GuestGuard], canActivateChild: [GuestGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
