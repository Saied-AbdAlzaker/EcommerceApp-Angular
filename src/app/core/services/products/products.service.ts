import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoint } from '../../constant/endPoint';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient: HttpClient) { }

  allProducts(): Observable<any> {
    return this._httpClient.get(`${EndPoint.BaseUrl}/products`);
  }

  specificProduct(id: string): Observable<any> {
    return this._httpClient.get(`${EndPoint.BaseUrl}/products/${id}`);
  }

}
