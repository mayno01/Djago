import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelService} from '../../services/hotel.service';

interface Hotel {  // Define your Hotel interface if it’s not imported
  name: string;
  location: string;
  rating: number;
  price: number;
  description: string;
}

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css'],
  imports: [FormsModule] // Add FormsModule here
})
export class AddHotelComponent {
  hotel: Hotel = {
    name: '',
    location: '',
    rating: 0,
    price: 0,
    description: ''
  };

  constructor(private hotelService: HotelService, private router: Router) {}

  addHotel(): void {
    this.hotelService.createHotel(this.hotel).subscribe(
      (response: any) => {  // Define the response type
        console.log('Hotel added successfully:', response);
        this.router.navigate(['/hotels']); // Navigate back to the hotel list
      },
      (error: any) => {  // Define the error type
        console.error('Error adding hotel:', error);
      }
    );
  }
}
