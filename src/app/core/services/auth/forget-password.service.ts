import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoint } from '../../constant/endPoint';
import { ResetPassword, ResponseForgetPassword, ResponseResetCode, ResponseResetPassword } from '../../../shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private _httpClient: HttpClient) { }

  forgetPassword(formData: string): Observable<ResponseForgetPassword> {
    return this._httpClient.post<ResponseForgetPassword>(`${EndPoint.BaseUrl}/auth/forgotPasswords`, formData)
  }

  resetCode(formData: string): Observable<ResponseResetCode> {
    return this._httpClient.post<ResponseResetCode>(`${EndPoint.BaseUrl}/auth/verifyResetCode`, formData)
  }

  resetPassword(formData: ResetPassword): Observable<ResponseResetPassword> {
    return this._httpClient.put<ResponseResetPassword>(`${EndPoint.BaseUrl}/auth/resetPassword`, formData)
  }

}
