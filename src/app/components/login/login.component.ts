import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authServ = inject(AuthService);
  route = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  fakeLogin(){
    this.authServ.isAuth = true;
    this.route.navigate(['/home']);
  }

  submitForm(){
    if(this.loginForm.valid){
      console.log(this.loginForm);

      const formValues = this.loginForm.value;

      if(this.authServ.searchUser(formValues.email, formValues.password)){
        this.authServ.isAuth = true;
        alert('login effectued with success');
      }

    } else{
      for (const key in this.loginForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.loginForm.controls, key)) {
          const element = this.loginForm.get(key);
          console.log(key, element?.errors)
        }
      }
    }
  }
}
