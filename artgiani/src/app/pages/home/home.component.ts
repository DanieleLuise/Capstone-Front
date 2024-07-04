import { Component, OnInit } from '@angular/core';
import { IProdotto } from '../../models/i-prodotto';
import { ProdottoService } from '../../services/prodotto.service';
import { CartService } from '../../services/cart.service';
import { ProductStateService } from '../../services/product-state.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  prodotti: IProdotto[] = [];
  currentUser: any;

  constructor(private prodottoService:ProdottoService, private cartService: CartService, private productStateService: ProductStateService, private authService: AuthService) { }

  ngOnInit(): void {
    this.productStateService.prodotti$.subscribe(prodotti => {
      this.prodotti = prodotti;
    });
    this.currentUser = this.authService.getUserProfile();
  }

  isUserProduct(prodotto: IProdotto): boolean {
    console.log(this.currentUser.id);
    console.log(prodotto);


    return this.currentUser.id === prodotto.idUser;

  }

    addToCart(prodotto: IProdotto): void {
      if (prodotto.quantita > 0) {
        this.cartService.addToCart(prodotto);
      } else {
        console.log('Prodotto non disponibile');
      }
    }

    removeProduct(prodotto: IProdotto): void {

      this.prodottoService.deleteProdotto(prodotto.id).subscribe(()=> {
        this.productStateService.removeProduct(prodotto.id)
      });
    }

  }




