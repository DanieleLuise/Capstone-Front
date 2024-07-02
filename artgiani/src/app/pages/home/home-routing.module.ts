import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProdottoComponent } from './prodotto/prodotto.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'aggiungi', component:ProdottoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
