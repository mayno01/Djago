import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import {Router, RouterLink} from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '../../../public/lib/owlcarousel/assets/owl.carousel.min.css',
    '../../../public/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css'
  ]
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;  // Track the login status

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();  // Check the login status on initialization
  }

  // Function to check if the user is logged in
  checkLoginStatus() {
    this.isLoggedIn = !!this.authService.getAccessToken(); // Set isLoggedIn based on token presence
  }

  // Login function (you might need to implement a login form)
  login() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);  // Redirect to login page
    }
  }

  // Logout function
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;  // Update the login status
    this.router.navigate(['/login']);  // Redirect to login page
  }
}
