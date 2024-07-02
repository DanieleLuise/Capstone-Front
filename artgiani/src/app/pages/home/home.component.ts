import { Component, OnInit } from '@angular/core';
import { IProdotto } from '../../models/i-prodotto';
import { ProdottoService } from '../../services/prodotto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  prodotti: IProdotto[] = [];


  constructor(private prodottoService: ProdottoService) { }

  ngOnInit(): void {
    this.loadProdotti();
  }

  loadProdotti(): void {
    this.prodottoService.getAllProdotti().subscribe({
      next: (prodotti) => {
        console.log('Prodotti caricati:', prodotti);
        this.prodotti = prodotti.map(prodotto => {
          console.log('Prodotto:', prodotto);
          return {
            ...prodotto,
            firstName: prodotto.firstName || 'N/A',
            lastName: prodotto.lastName || 'N/A'
          };
        });
      },
      error: (err) => {
        console.error('Errore nel caricamento dei prodotti:', err);
      }
    });
  }



  onProductAdded(prodotto: IProdotto): void {
    this.prodotti.push(prodotto);
    console.log('Product added:', prodotto);
  }
}
