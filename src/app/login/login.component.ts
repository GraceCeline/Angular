import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopsService } from '../workshops.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';
  isLoggedIn : boolean;
  loginInvalid : boolean;

  constructor(private authService: AuthService, private router: Router, private workshopService : WorkshopsService) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({

      next: (response) => {
        console.log(this.password,this.username);
        // this.authService.setToken(response.access, response.refresh);
        console.log(response.body.token);
        localStorage.setItem('token', response.body.token);
        localStorage.setItem('username', response.body.username);
        // console.log(this.authService.getCsrfToken());
        console.log(localStorage.getItem('token'));
        this.isLoggedIn = true;
        this.router.navigate(['']);
        this.workshopService.openModal(response.status, "Successfully logged in!");
      },
      error: (error) => {
        // console.log(this.authService.getCsrfToken());
        this.message = 'Invalid username or password.';
        this.isLoggedIn = false;
        this.loginInvalid = true;
      }
    });
  }

}
