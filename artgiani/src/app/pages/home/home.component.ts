import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IProdotto } from '../../models/i-prodotto';
import { ProdottoService } from '../../services/prodotto.service';
import { CartService } from '../../services/cart.service';
import { ProductStateService } from '../../services/product-state.service';
import { AuthService } from '../../auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from '../../models/i-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  prodotti: IProdotto[] = [];
  currentUser: any;
selectedVendor: any;


@ViewChild('vendorInfo', { static: true }) vendorInfoTemplate!: TemplateRef<any>;
  constructor(private modalService: NgbModal,private prodottoService:ProdottoService, private cartService: CartService, private productStateService: ProductStateService, private authService: AuthService) { }

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

    openVendorInfo(prodotto: IProdotto, user:IUser): void {
      this.selectedVendor = {
        firstName: prodotto.firstName,
        lastName: prodotto.lastName,
        email: user.email, // assuming this data is available in the prodotto object
        citta: user.citta // assuming this data is available in the prodotto object
      };
      this.modalService.open(this.vendorInfoTemplate);
    }
  }




