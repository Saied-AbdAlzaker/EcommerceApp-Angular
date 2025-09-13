import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { ICart, IResponseCart } from '../../../shared/interfaces/cart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartList!: IResponseCart;
  cart: ICart[] = [];
  totalPrice: number = 0;

  constructor(private _cartService: CartService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {
    this._cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartList = res;
        this.cart = this.cartList.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this._cartService.cartNumbers.set(res.numOfCartItems);
      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!');
      }
    })
  }

  updateUserCart(productId: string, count: number) {
    this._cartService.updateProductToCart(productId, count).subscribe({
      next: (res) => {
        // this.cartList = res;
        this.cart = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this._cartService.cartNumbers.set(res.numOfCartItems);
      }
    })
  }

  removeUserCart(productId: string) {
    this._cartService.removeSpecificCartItem(productId).subscribe({
      next: (res) => {
        // this.cartList = res;
        this.cart = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this._cartService.cartNumbers.set(res.numOfCartItems);
        this._toastr.success('Product deleted successfully from your cart', 'Success');
      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!');
      }
    })
  }

  clearCart() {
    this._cartService.clearUserCart().subscribe({
      next: (res) => {
        this.getUserCart();
        this._toastr.success('Clear your cart  successfully', 'Success');
      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!');
      }
    })
  }

}
