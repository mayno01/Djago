import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecommendationService } from '../../services/recommendation.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for structural directives

@Component({
  selector: 'app-recommendation',
  standalone: true, // Standalone component
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule and CommonModule
  template: `
    <form [formGroup]="recommendationForm" (ngSubmit)="submit()">
      <input type="number" formControlName="budget" placeholder="Budget" required min="0" />
      <input type="number" formControlName="num_people" placeholder="Number of People" required min="1" />
      <input type="number" formControlName="days_of_travel" placeholder="Days of Travel" required min="1" />
      <input type="number" formControlName="preferred_difficulty" placeholder="Preferred Difficulty" required min="1" />
      <input type="number" formControlName="preferred_rating" placeholder="Preferred Rating" required min="1" max="5" />
      <button type="submit" [disabled]="recommendationForm.invalid || isLoading">
        {{ isLoading ? 'Loading...' : 'Get Recommendations' }}
      </button>
    </form>

    <div *ngIf="recommendations && recommendations.length > 0">
      <h2>Recommendations:</h2>
      <div *ngFor="let recommendation of recommendations" class="recommendation-card">
        <h3>{{ recommendation.name }}</h3>
        <p><strong>Location:</strong> {{ recommendation.location }}</p>
        <p><strong>Rating:</strong> {{ recommendation.rating }}</p>
        <p><strong>Difficulty Level:</strong> {{ recommendation.difficulty_level }}</p>
        <p><strong>Description:</strong> {{ recommendation.description }}</p>
        <hr />
      </div>
    </div>

    <div *ngIf="recommendations && recommendations.length === 0">
      <h2>No recommendations found. Please try different criteria.</h2>
    </div>

    <div *ngIf="error">
      <h2>Error fetching recommendations: {{ error }}</h2>
    </div>
  `,
  styles: [`
    .recommendation-card {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 15px;
      margin: 10px 0;
      background-color: #f9f9f9;
      transition: box-shadow 0.3s;
    }

    .recommendation-card:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    h2 {
      color: #333;
    }

    h3 {
      margin: 0;
      color: #007bff;
    }

    p {
      margin: 5px 0;
    }
  `]
})
export class RecommendationComponent implements OnInit {
  recommendationForm: FormGroup;
  recommendations: any[] = []; // Initialize as an empty array
  isLoading: boolean = false; // Loading state
  error: string | null = null; // Error state

  constructor(private fb: FormBuilder, private recommendationService: RecommendationService) {
    // Initialize the form using FormBuilder
    this.recommendationForm = this.fb.group({
      budget: [0, [Validators.required, Validators.min(0)]],
      num_people: [1, [Validators.required, Validators.min(1)]],
      days_of_travel: [1, [Validators.required, Validators.min(1)]],
      preferred_difficulty: [1, [Validators.required, Validators.min(1)]],
      preferred_rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit() {
    // Perform any additional initialization if needed
  }

  submit() {
    if (this.recommendationForm.invalid) {
      return; // Prevent submission if the form is invalid
    }
    
    this.recommendations = []; // Clear previous recommendations
    this.isLoading = true; // Set loading state
    this.error = null; // Reset error state

    const data = this.recommendationForm.value; // Get form values

    this.recommendationService.getRecommendations(data).subscribe(
      response => {
        this.recommendations = response;
        this.isLoading = false; // Reset loading state
      },
      error => {
        console.error('Error fetching recommendations', error);
        this.isLoading = false; // Reset loading state on error
        this.error = 'Failed to fetch recommendations. Please try again.'; // Set error message
      }
    );
  }
}
