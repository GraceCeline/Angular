import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({

      next: (response) => {
        console.log(this.password,this.username);
        this.authService.setToken(response.access, response.refresh);
        console.log(this.authService.getCsrfToken());
        this.isLoggedIn = true;
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log(this.authService.getCsrfToken());
        this.message = 'Invalid username or password.';
        this.isLoggedIn = false;
        this.loginInvalid = true;
      }
    });
  } 

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

}
