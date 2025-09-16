import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, ResponseUser } from '../../../shared/interfaces/auth';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { EndPoint } from '../../constant/endPoint';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user: BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload>(null);
  user: WritableSignal<any> = signal(null)

  constructor(private _httpClient: HttpClient, @Inject(PLATFORM_ID) Id: object, private _router: Router) {
    if (isPlatformBrowser(Id)) {
      if (localStorage.getItem('userToken') !== null) {
        this.userInfo();
      }
    }
  }

  userInfo() {
    const token = localStorage.getItem('userToken') || '';
    const decoded = jwtDecode(token);
    this.user.set(decoded);
  }

  register(formData: Auth): Observable<ResponseUser> {
    return this._httpClient.post<ResponseUser>(`${EndPoint.BaseUrl}/auth/signup`, formData)
  }

  login(formData: Auth): Observable<ResponseUser> {
    return this._httpClient.post<ResponseUser>(`${EndPoint.BaseUrl}/auth/signin`, formData)
  }

  logout() {
    localStorage.removeItem('userToken');
    this.user.set(null);
    this._router.navigate(['/signin']);
  }

}
