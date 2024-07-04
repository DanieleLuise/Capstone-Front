import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProdottoComponent } from './prodotto/prodotto.component';
import { CarrelloComponent } from '../carrello/carrello.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'aggiungi', component:ProdottoComponent},
  {path: 'carrello', component:CarrelloComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
