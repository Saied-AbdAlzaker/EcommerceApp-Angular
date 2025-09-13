import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoint } from '../../constant/endPoint';
import { ResponseBrands, ResponseSpecificBrand } from '../../../shared/interfaces/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _httpClient: HttpClient) { }

  allBrands(): Observable<ResponseBrands> {
    return this._httpClient.get<ResponseBrands>(`${EndPoint.BaseUrl}/brands`);
  }

  getSpecificBrand(id: string): Observable<ResponseSpecificBrand> {
    return this._httpClient.get<ResponseSpecificBrand>(`${EndPoint.BaseUrl}/brands/${id}`);
  }

}
