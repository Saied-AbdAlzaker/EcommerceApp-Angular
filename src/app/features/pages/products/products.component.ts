import { CommonModule, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { IProducts } from '../../../shared/interfaces/products';
import { FormsModule } from "@angular/forms";
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [CommonModule, CurrencyPipe, FilterPipe,
    FormsModule, RouterLink,TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  productsList: WritableSignal<IProducts[]> = signal([]);
  searchValue: string = '';

  constructor(private _productsService: ProductsService, private _cartService: CartService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productsService.allProducts().subscribe({
      next: (res) => {
        this.productsList.set(res.data);
        this._cartService.cartNumbers.set(res.data.numOfCartItems);
      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!');
      }
    })
  }

  addToCart(productId: string) {
    this._cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this._cartService.cartNumbers.set(res.numOfCartItems);
        this._toastr.success(res.message, 'Success');
      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!');
      }
    })
  }

}
