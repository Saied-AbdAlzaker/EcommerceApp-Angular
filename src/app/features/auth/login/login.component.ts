import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  errMessage: string = '';
  loading: boolean = false;

  constructor(private _auth: AuthService, private _router: Router) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/)]),
  })

  submitForm() {
    this.loading = true;
    if (this.loginForm.valid) {
      this._auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.message == 'success') {
            this._router.navigate(['/home']);
            localStorage.setItem('userToken', res.token);
            this._auth.userInfo();
          }
        },
        error: (err) => {
          this.loading = false;
          this.errMessage = err.error.message;
        }
      })
    }
  }

}
