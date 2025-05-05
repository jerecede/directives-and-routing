import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SuperBtnDirective } from './directives/super-btn/super-btn.directive';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule], //SuperBtnDirective,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'directives-and-routing';

  authServ = inject(AuthService);

  logout(){
    this.authServ.isAuth = false;
  }
}
