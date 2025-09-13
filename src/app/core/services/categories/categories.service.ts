import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoint } from '../../constant/endPoint';
import { ResponseCategory, ResponseSpecificCategory } from '../../../shared/interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient: HttpClient) { }

  allCategories(): Observable<ResponseCategory> {
    return this._httpClient.get<ResponseCategory>(`${EndPoint.BaseUrl}/Categories`);
  }

  getSpecificCategory(id: string): Observable<ResponseSpecificCategory> {
    return this._httpClient.get<ResponseSpecificCategory>(`${EndPoint.BaseUrl}/Categories/${id}`);
  }

}
