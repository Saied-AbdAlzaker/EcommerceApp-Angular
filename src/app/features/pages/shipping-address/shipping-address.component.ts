import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shipping-address',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {

  loading: boolean = false;
  cartId: string = '';

  constructor(private _activatedRoute: ActivatedRoute, private _cartService: CartService, private _toastr: ToastrService) {
    _activatedRoute.params.subscribe({
      next: (res) => {
        this.cartId = res['cartId'];
      }
    })
  }

  addressForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required])
  })

  submitForm() {
    this.loading = true;
    this._cartService.checkOut(this.cartId, this.addressForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        window.location.href = res.session.url;
      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!')
      }
    })
  }

}
