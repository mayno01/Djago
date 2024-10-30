import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Destination} from '../destination';
import {DestinationService} from '../destination.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NgForOf
  ],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent {
  destinations: Destination[] = [];

  constructor(private destinationService: DestinationService,  private router: Router) {}

  ngOnInit(): void {
    this.destinationService.getDestinations().subscribe(
      (data) => {
        this.destinations = data;
      },
      (error) => {
        console.error('Error fetching destinations', error);
      }
    );
  }

  goToDetails(id: number): void {
    this.router.navigate(['/destination', id]);
  }

goToAddDestination(): void {
  this.router.navigate(['/add-destination']);
}

  deleteDestination(id: number): void {
    if (confirm('Are you sure you want to delete this destination?')) {
      this.destinationService.deleteDestination(id).subscribe(
        () => {
          alert('Destination deleted successfully!');
          this.loadDestinations(); // Reload the destinations list after deletion
        },
        (error) => {
          console.error('Error deleting destination:', error);
        }
      );
    }
  }

  loadDestinations(): void {
    this.destinationService.getDestinations().subscribe(
      (data: Destination[]) => {
        this.destinations = data;
      },
      (error) => {
        console.error('Error fetching destinations:', error);
      }
    );
  }
  goToUpdate(id: number): void {
    this.router.navigate(['/destinations/update', id]);
  }
}
