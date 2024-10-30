import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService, Hotel } from '../../services/hotel.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel | null = null; // Initialize as null

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadHotel();
  }

  loadHotel(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.hotelService.getHotel(id).subscribe(
        (data) => {
          this.hotel = data; // Assign fetched data to hotel
        },
        (error) => {
          console.error('Error fetching hotel details:', error);
        }
      );
    }
  }
}
