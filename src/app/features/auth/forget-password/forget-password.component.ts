import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ForgetPasswordService } from '../../../core/services/auth/forget-password.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, TranslateModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  errMessage: string = '';
  errMessageCode: string = '';
  errMessagePassword: string = '';
  loading: boolean = false;
  visible: number = 1

  constructor(private _forgetPasswordService: ForgetPasswordService, private _auth: AuthService,
    private _router: Router) { }

  // Forget Password
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })

  submitFogetPassword() {
    this.loading = true;
    if (this.forgetPasswordForm.valid) {
      this._forgetPasswordService.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.statusMsg == 'success') {
            this.visible = 2;
          }
        },
        error: (err) => {
          console.log(err);

          this.loading = false;
          this.errMessage = err.error.message;
        }
      })
    }
  }

  // Reset Code
  ResetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6}$/)]),
  })

  submitResetCode() {
    this.loading = true;
    if (this.ResetCodeForm.valid) {
      this._forgetPasswordService.resetCode(this.ResetCodeForm.value).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.status == 'Success') {
            this.visible = 3;
          }
        },
        error: (err) => {
          console.log(err);

          this.loading = false;
          this.errMessageCode = err.error.message;
        }
      })
    }
  }

  // Reset Password
  NewPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/)]),
  })

  submitNewPassword() {
    this.loading = true;
    if (this.ResetCodeForm.valid) {
      this._forgetPasswordService.resetPassword(this.NewPasswordForm.value).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.token) {
            localStorage.setItem('userToken', res.token);
            this._auth.userInfo();
            this._router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.log(err);

          this.loading = false;
          this.errMessagePassword = err.error.message;
        }
      })
    }
  }


}
