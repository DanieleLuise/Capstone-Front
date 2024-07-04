import { Component, OnInit } from '@angular/core';
import { IProdotto } from '../../models/i-prodotto';
import { ProdottoService } from '../../services/prodotto.service';
import { CartService } from '../../services/cart.service';
import { ProductStateService } from '../../services/product-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  prodotti: IProdotto[] = [];


  constructor( private cartService: CartService, private productStateService: ProductStateService) { }

  ngOnInit(): void {
    this.productStateService.prodotti$.subscribe(prodotti => {
      this.prodotti = prodotti;
    });
  }


    addToCart(prodotto: IProdotto): void {
      if (prodotto.quantita > 0) {
        this.cartService.addToCart(prodotto);
      } else {
        console.log('Prodotto non disponibile');
      }
    }



  }




