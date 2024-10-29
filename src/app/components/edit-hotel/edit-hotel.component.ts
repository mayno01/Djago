import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService, Hotel } from '../../services/hotel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Include CommonModule here
})
export class EditHotelComponent implements OnInit {
  hotel: Hotel; // Remove the null initialization

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    public router: Router // Change 'private' to 'public' or remove the access modifier
  ) {
    // Initialize hotel with default values
    this.hotel = {
      id: 0,
      name: '',
      location: '',
      rating: 0,
      price: 0,
      description: ''
    };
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get the hotel ID from the route
    this.loadHotel(id); // Load hotel details
  }

  loadHotel(id: number): void {
    this.hotelService.getHotel(id).subscribe(
      (hotel) => {
        this.hotel = hotel; // Set the hotel data
      },
      (error) => {
        console.error('Error fetching hotel:', error);
      }
    );
  }

  updateHotel(): void {
    if (this.hotel && this.hotel.id) {
      this.hotelService.updateHotel(this.hotel.id, this.hotel).subscribe(
        (response) => {
          console.log('Hotel updated successfully:', response);
          this.router.navigate(['/hotels']); // Navigate back to the hotel list
        },
        (error) => {
          console.error('Error updating hotel:', error);
        }
      );
    }
  }
}
