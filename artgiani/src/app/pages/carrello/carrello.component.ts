import { Component, OnInit } from '@angular/core';
import { IProdotto } from '../../models/i-prodotto';
import { CartService } from '../../services/cart.service';
import { ProductStateService } from '../../services/product-state.service';
import { ProdottoService } from '../../services/prodotto.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.scss'
})
export class CarrelloComponent implements OnInit {
  cart: IProdotto[] = [];

  constructor(private prodottoService: ProdottoService,private cartService: CartService, private productStateService: ProductStateService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cart = [];
  }

  purchaseCart(): void {
    const purchasedProducts = this.cartService.purchaseCart();
    purchasedProducts.forEach(product => {
      const newQuantity = product.quantita - 1;
      this.prodottoService.updateProductQuantity(product.id, newQuantity).subscribe(updatedProduct => {
        this.productStateService.updateProductQuantity(product.id, updatedProduct.quantita);
    });
    this.cart = [];
  });

  }

}
