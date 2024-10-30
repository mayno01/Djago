import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {DestinationService} from '../destination.service';
import {Destination} from '../destination';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-destination',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './add-destination.component.html',
  styleUrl: './add-destination.component.css'
})
export class AddDestinationComponent {
  destination: Destination = new Destination();
  selectedImage!: File; // Declare a variable for the selected image

  constructor(private destinationService: DestinationService, private router: Router) {}

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0]; // Get the selected image file
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.destination.name);
    formData.append('description', this.destination.description);
    formData.append('location', this.destination.location);
    formData.append('price', this.destination.price.toString());
    formData.append('popular', this.destination.popular.toString());
    formData.append('image', this.selectedImage); // Append the image file to the form data

    this.destinationService.createDestination(formData).subscribe(
      () => {
        alert('Destination added successfully!');
        this.router.navigate(['/destinations']);
      },
      (error) => {
        console.error('Error adding destination:', error);
      }
    );
  }
}
