import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.services';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private AuthService: AuthService) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required]],
      Contraseña: ['', [Validators.required]],

    });
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    }
    else {
      this.AuthService.login(this.loginForm.value)
    }
  }
}