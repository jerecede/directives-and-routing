import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  authServ = inject(AuthService);
  route = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  submitForm() {
    if (this.registerForm.valid) {
      console.log(this.registerForm);
      this.authServ.isAuth = true;
      this.route.navigate(['/home']);
    } else {
      for (const key in this.registerForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.registerForm.controls, key)) {
          const element = this.registerForm.get(key);
          console.log(element)
          console.log(key, element?.errors)
        }
      }
    }
  }
  //fare logica service POST, controllare che non ci siano cloni, e fare validators per password e confirm password
}
