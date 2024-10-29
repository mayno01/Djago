import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs'; // Import Observable
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '../../../public/lib/owlcarousel/assets/owl.carousel.min.css',
    '../../../public/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css'
  ]
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;  
  isPopupOpen = false;
  userMessage: string = ''; // Store user input message
  messages: any[] = []; // Store chat messages

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.checkLoginStatus(); 
  }

  checkLoginStatus() {
    this.isLoggedIn = !!this.authService.getAccessToken(); 
  }

  login() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);  
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false; 
    this.router.navigate(['/login']); 
  }

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen; // Toggle popup visibility
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      // Add user's message to the messages array
      this.messages.push({ text: this.userMessage, recipient_id: 'user' });
  
      // Prepare the JSON object to send
      const messagePayload = { message: this.userMessage };
  
      // Send the message to the API
      this.http.post('http://127.0.0.1:8000/api/chat/', messagePayload).subscribe(
        (response: any) => {
          // Add the response messages with 'bot' recipient_id
          response.forEach((msg: any) => {
            this.messages.push({ ...msg, recipient_id: 'bot' });
          });
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
  
      // Clear the input after sending
      this.userMessage = '';
    }
  }
  
}