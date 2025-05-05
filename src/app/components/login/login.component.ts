import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { findUser } from '../../validators/validators'
import { User } from '../../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authServ = inject(AuthService);
  route = inject(Router);
  users: User[] = [];

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.authServ.getUsers().then(usersData => this.users = usersData);

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }, {
      validators: findUser(this.users)
    });
  }

  fakeLogin() {
    this.authServ.isAuth = true;
    this.route.navigate(['/home']);
  }

  submitForm() {
    if (this.loginForm.valid) {
      console.log(this.loginForm, ' VALIDO');
      this.authServ.isAuth = true;
      this.route.navigate(['/home']);
    } else {
      for (const key in this.loginForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.loginForm.controls, key)) {
          const element = this.loginForm.get(key);
          console.log(element)
          console.log(key, element?.errors, ' NON VALIDO')
        }
      }
    }
  }
}
