import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProdotto } from '../models/i-prodotto';
import { ProdottoService } from './prodotto.service';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {

  private prodottiSubject: BehaviorSubject<IProdotto[]> = new BehaviorSubject<IProdotto[]>([]);
  public prodotti$: Observable<IProdotto[]> = this.prodottiSubject.asObservable();

  constructor(private prodottoService: ProdottoService) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.prodottoService.getAllProdotti().subscribe({
      next: (prodotti) => {
        this.prodottiSubject.next(prodotti);
      },
      error: (err) => {
        console.error('Errore nel caricamento dei prodotti:', err);
      }
    });
  }

  updateProductQuantity(id: number, newQuantity: number): void {
    const currentProdotti = this.prodottiSubject.getValue();
    const updatedProdotti = currentProdotti.map(prodotto => {
      if (prodotto.id === id) {
        return { ...prodotto, quantita: newQuantity, isAvailable: newQuantity > 0 };
      }
      return prodotto;
    });
    this.prodottiSubject.next(updatedProdotti);
  }

  addProduct(prodotto: IProdotto): void {
    const currentProdotti = this.prodottiSubject.getValue();
    this.prodottiSubject.next([...currentProdotti, prodotto]);
  }

  removeProduct(id: number): void {

      const currentProdotti = this.prodottiSubject.getValue();
      const updatedProdotti = currentProdotti.filter(prodotto => prodotto.id !== id);
      this.prodottiSubject.next(updatedProdotti);

  }
}
