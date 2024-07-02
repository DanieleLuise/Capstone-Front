import { Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
import { IProdotto } from '../../../models/i-prodotto';
import { ProdottoService } from '../../../services/prodotto.service';
import { AuthService } from '../../../auth/auth.service';
@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrl: './prodotto.component.scss'
})
export class ProdottoComponent {
  @Output() productAdded = new EventEmitter<IProdotto>();

  prodotto: Partial<IProdotto> = {};
  selectedFile: File[] = [];

  constructor(private prodottoService: ProdottoService, private authService: AuthService,private router:Router) {
    console.log('ProdottoComponent loaded');
   }




  onFileSelected(event: any): void {
    this.selectedFile =  Array.from(event.target.files);
    console.log('Selected Files:', this.selectedFile);
  }

  submitProduct(): void {
    console.log('submitProduct called');
    const currentUser = this.authService.getUserProfile();
    console.log('Current User:', currentUser);

    if (currentUser && this.selectedFile.length > 0) {
       this.prodotto.idUser = currentUser.id;
      console.log('Prodotto before submit:', this.prodotto);

      this.prodottoService.createProdotto(this.prodotto, this.selectedFile).subscribe({
        next: (prodotto) => {
          console.log('Product Created:', prodotto);
          this.productAdded.emit(prodotto);
          this.router.navigate([''])
        },

        error: (err) => {
          console.error('Error creating product:', err);
        }
      });
    }
  }
}
