import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EndPoint } from '../../constant/endPoint';
import { IResponseCart, IResponseShippingAddress, IShippingAddress } from '../../../shared/interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartNumbers: WritableSignal<number> = signal(0);
  constructor(private _httpClient: HttpClient) {

    this.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartNumbers.set(res.numOfCartItems);
      }
    })
  }

  addProductToCart(prodId: string): Observable<any> {
    return this._httpClient.post(`${EndPoint.BaseUrl}/cart`,
      { productId: prodId }
    )
  }

  getLoggedUserCart(): Observable<IResponseCart> {
    return this._httpClient.get<IResponseCart>(`${EndPoint.BaseUrl}/cart`
    )
  }

  updateProductToCart(prodId: string, count: number): Observable<any> {
    return this._httpClient.put(`${EndPoint.BaseUrl}/cart/${prodId}`,
      { count: count }
    )
  }

  removeSpecificCartItem(prodId: string): Observable<any> {
    return this._httpClient.delete(`${EndPoint.BaseUrl}/cart/${prodId}`
    )
  }

  clearUserCart(): Observable<any> {
    return this._httpClient.delete(`${EndPoint.BaseUrl}/cart`
    )
  }

  checkOut(cartId: string, payload: IShippingAddress): Observable<IResponseShippingAddress> {
    return this._httpClient.post<IResponseShippingAddress>(`${EndPoint.BaseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`, {
      shippingAddress: payload
    });
  }

}
