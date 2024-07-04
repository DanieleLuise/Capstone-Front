import { Injectable } from '@angular/core';
import { IProdotto } from '../models/i-prodotto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: IProdotto[] = [];

  getCart(): IProdotto[] {
    return this.cart;
  }

  addToCart(prodotto: IProdotto): void {
    this.cart.push(prodotto);
  }

  clearCart(): void {
    this.cart = [];
  }

  purchaseCart(): IProdotto[] {
    const purchasedProducts = [...this.cart];
    this.clearCart();
    return purchasedProducts;
  }

}
