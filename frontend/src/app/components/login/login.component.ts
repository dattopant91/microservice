import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  handleLogin(): void {
    this.errorMessage = '';
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token, response.username);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Invalid Username or Password!';
        } else {
          this.errorMessage = 'API Gateway किंवा Backend सर्व्हर बंद आहे!';
        }
      }
    });
  }
}
