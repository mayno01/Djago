import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircuitService, Circuit } from '../../services/circuit.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Review } from '../../review.model'; // Ensure this path is correct

@Component({
  selector: 'app-circuit-list',
  templateUrl: './circuit-list.component.html',
  styleUrls: ['./circuit-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CircuitListComponent implements OnInit {
  circuits: Circuit[] = [];
  selectedCircuit: Circuit | null = null;
  reviews: Review[] = [];
  newReview: Review = { id: 0, user: 0, circuit: 0, rating: 1, comment: '' }; // Initialize a new review object

  constructor(private circuitService: CircuitService, private router: Router) {}

  ngOnInit(): void {
    this.loadCircuits();
  }

  loadCircuits(): void {
    this.circuitService.getCircuits().subscribe(
      (data) => {
        this.circuits = data;
      },
      (error) => {
        console.error('Error fetching circuits:', error);
      }
    );
  }

 

  addCircuit(): void {
    this.router.navigate(['/add-circuit']); // Navigate to add circuit page
  }

  editCircuit(id: number): void {
    this.router.navigate(['/circuits/edit', id]);
  }

  deleteCircuit(id: number): void {
    if (confirm('Are you sure you want to delete this circuit?')) {
      this.circuitService.deleteCircuit(id).subscribe(
        () => {
          this.circuits = this.circuits.filter(circuit => circuit.id !== id);
          console.log('Circuit deleted successfully!');
        },
        (error) => {
          console.error('Error deleting circuit:', error);
        }
      );
    }
  }

  loadReviews(circuitId: number): void {
    this.circuitService.getReviews(circuitId).subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  submitReview(circuitId: number): void {
    if (this.newReview.rating && this.newReview.comment) {
      // Assign the valid circuit ID to the new review
      this.newReview.circuit = circuitId;
      this.newReview.user = 1; // Assign a user ID (You may want to get this from the logged-in user context)

      // Now call addReview with the Review object only
      this.circuitService.addReview(this.newReview).subscribe(
        (review) => {
          this.reviews.push(review);
          this.newReview = { id: 0, user: 0, circuit: 0, rating: 1, comment: '' }; // Reset form with default
          console.log('Review added successfully!');
        },
        (error) => {
          console.error('Error adding review:', error);
        }
      );
    } else {
      console.error('Review must have a rating and comment.');
    }
  }
  viewCircuit(id: number): void {
    this.router.navigate(['/circuits', id]); // This will navigate to CircuitDetailComponent
  }
  
}
