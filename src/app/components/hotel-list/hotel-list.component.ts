import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HotelService, Hotel } from '../../services/hotel.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Add FormsModule here
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  selectedHotel: Hotel | null = null; 

  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe(
      (data) => {
        this.hotels = data;
      },
      (error) => {
        console.error('Error fetching hotels:', error);
      }
    );
  }

  viewHotel(id: number): void {
    this.router.navigate(['/hotels', id]); // Navigate to hotel detail page
  }

  addHotel(): void {
    this.router.navigate(['/add-hotel']); // Navigate to add hotel page
  }

  editHotel(id: number): void { // Accept id parameter
    this.router.navigate(['/edit-hotel', id]); // Navigate to edit hotel page
  }

  deleteHotel(id: number): void {
    this.hotelService.deleteHotel(id).subscribe(
      () => {
        this.hotels = this.hotels.filter(hotel => hotel.id !== id);
      },
      (error) => {
        console.error('Error deleting hotel:', error);
      }
    );
  }
}
