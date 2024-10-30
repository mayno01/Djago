import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  standalone: true,
  imports: [FormsModule], 
})
export class ForgetPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.sendResetLink({ email: this.email }).subscribe({
      next: (response) => alert('Password reset link sent to your email.'),
      error: (err) => alert('Error sending reset link.'),
    });
  }
}
