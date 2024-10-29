import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [FormsModule], 
})
export class ResetPasswordComponent implements OnInit {
  newPassword: string = '';
  uidb64: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.uidb64 = this.route.snapshot.paramMap.get('uidb64')!;
    this.token = this.route.snapshot.paramMap.get('token')!;
  }

  onSubmit() {
    const data = { new_password: this.newPassword };
    this.authService.resetPassword(this.uidb64, this.token, data).subscribe({
      next: () => {
        alert('Password has been reset successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Error resetting password.'),
    });
  }
}
