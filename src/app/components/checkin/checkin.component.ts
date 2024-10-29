import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CheckinService } from '../../services/checkin.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Add CommonModule and FormsModule here
})
export class CheckinComponent {
  prompt: string = '';
  responseData: any;

  constructor(private checkinService: CheckinService) { }

  onCheckIn() {
    this.checkinService.checkIn(this.prompt).subscribe(
      (data) => {
        this.responseData = data; // Handle successful response
      },
      (error) => {
        console.error('Error:', error); // Handle error
      }
    );
  }
}
