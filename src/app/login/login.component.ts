import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule], 
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {} 

  onLogin() {
    const credentials = { username: this.username, password: this.password };

    this.authService.login(credentials).subscribe(
      (response) => {
        const { access, refresh } = response;
        this.authService.setTokens(access, refresh);
        console.log('Login successful:', response);
        this.router.navigate(['/home']); 
      },
      (error) => console.error('Login failed:', error)
    );
  }
}