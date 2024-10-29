import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],  // Add this line to import the CSS file
  standalone: true,
  imports: [FormsModule], 
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    const credentials = { username: this.username, password: this.password };

    this.authService.login(credentials).subscribe(
      (response) => {
        const { access, refresh } = response;  // Destructure tokens from response
        this.authService.setTokens(access, refresh);  // Store tokens in cookies
        console.log('Login successful:', response);
      },
      (error) => console.error('Login failed:', error)
    );
  }
}