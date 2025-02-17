import { Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  selectAuthError,
  selectAuthLoading,
  selectToken,
} from '../../store/auth.selector';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { login } from '../../store/auth.action';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css',
})
export class FormLoginComponent {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  loading$: Observable<boolean> = new Observable();
  hidePassword = signal(true);

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });

    this.loading$ = this.store.select(selectAuthLoading);
  }

  togglePasswordVisibility(event: MouseEvent) {
    event.preventDefault();
  event.stopPropagation();
    this.hidePassword.set(!this.hidePassword());
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(login({ user: { email, password } }));

      this.handleAuthSuccess();
      this.handleAuthErrors();
    }
  }

  private handleAuthSuccess() {
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        this.router.navigate(['/']);
      }
    });
  }

  private handleAuthErrors() {
    this.store.select(selectAuthError).subscribe((error) => {
      if (error) {
        this.snackBar.open(error.toString(), 'Cerrar', { duration: 3000 });
      }
    });
  }
}
