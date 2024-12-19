import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
import { WorkshopsService } from '../workshops.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username : string;
  password1 : string;
  password2 : string;
  email : string;
  message : string;
  registerInvalid : boolean;

  constructor(private authService: AuthService, private router: Router, private workshopService : WorkshopsService) {}

  register() {
    const userData = {
      username: this.username,
      email: this.email,
      password1: this.password1,
      password2: this.password2,
    };
    this.authService.register(userData).subscribe({
      next : (response) => {
        console.log(userData);
        localStorage.setItem('token', response.body.token);
        this.registerInvalid = false;
        this.workshopService.openModal(response.status, "Successfully registered!");
      },
      error: (error) => {
        this.registerInvalid = true;
        console.error('Registration failed:', error);
        this.message = 'Registration failed. Please check your input.';
      }
    });
  }
}
