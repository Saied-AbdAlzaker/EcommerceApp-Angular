import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  errMessage: string = '';
  loading: boolean = false;

  constructor(private _auth: AuthService, private _router: Router) { }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[01245][0-9]{8}$/)])
  }, this.confirmPassword)

  // custom-validation
  confirmPassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;

    if (password == rePassword) {
      return null;
    } else {
      return { mismatch: true }
    }

  }

  submitForm() {
    this.loading = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.loading = false;
    } else {
      this._auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.message == 'success') {
            this._router.navigate(['/signin'])
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
