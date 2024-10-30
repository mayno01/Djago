import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], 
  standalone: true,
  imports: [FormsModule, CommonModule], 
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirm_password = '';
  passwordMismatch = false; 

  constructor(private authService: AuthService) {}

  onRegister() {
    if (this.password !== this.confirm_password) {
      this.passwordMismatch = true;
      console.error('Passwords do not match');
      return;
    }
    this.passwordMismatch = false;

    const user = { username: this.username, email: this.email, password: this.password };
    this.authService.register(user).subscribe(
      (response) => {
        console.log('Registration successful:', response);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}