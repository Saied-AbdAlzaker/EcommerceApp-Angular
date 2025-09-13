import { Component, OnInit } from '@angular/core';
import { IProducts, ResponseProducts } from '../../../shared/interfaces/products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  productId!: string;
  productDetails!: IProducts;

  constructor(private _activatedRoute: ActivatedRoute, private _cartService: CartService,
    private _productsService: ProductsService, private _toastr: ToastrService) {
    _activatedRoute.params.subscribe((res) => {
      this.productId = res['id'];
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.getSpecificProduct()
  }

  getSpecificProduct() {
    this._productsService.specificProduct(this.productId).subscribe((res) => {
      this.productDetails = res.data;
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
