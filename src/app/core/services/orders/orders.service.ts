import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoint } from '../../constant/endPoint';
import { Observable } from 'rxjs';
import { IOrders } from '../../../shared/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _httpClient: HttpClient) { }

  getAllOrders(): Observable<any> {
    return this._httpClient.get(`${EndPoint.BaseUrl}/orders`)
  }

  getUserOrders(id: string): Observable<any> {
    return this._httpClient.get(`${EndPoint.BaseUrl}/orders/user/${id}`)
  }

}
