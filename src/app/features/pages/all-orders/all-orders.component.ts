import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { CartItem, IOrders } from '../../../shared/interfaces/order';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  imports: [CurrencyPipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {

  allOrders: IOrders[] = [];
  userId: string = '';
  cartItem: CartItem[] = [];
  show: boolean = false;

  constructor(private _ordersService: OrdersService, private _authService: AuthService) { }

  ngOnInit(): void {
    this.userId = this._authService.user().id;
    this.getUserProducts(this.userId)
  }

  getUserProducts(id: string) {
    this._ordersService.getUserOrders(id).subscribe({
      next: (res) => {
        this.allOrders = res;
      }
    })
  }

  openModel(index: number) {
    this.cartItem = this.allOrders[index].cartItems;
    console.log(this.cartItem);
    this.show = true;
  }


}
