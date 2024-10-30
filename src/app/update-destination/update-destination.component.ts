import { Component } from '@angular/core';
import {Destination} from '../destination';
import {DestinationService} from '../destination.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-update-destination',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './update-destination.component.html',
  styleUrl: './update-destination.component.css'
})
export class UpdateDestinationComponent {
  destination: Destination = new Destination();
  selectedImage!: File; // Variable for the selected image

  constructor(
    private destinationService: DestinationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get ID from route
    this.destinationService.getDestination(id).subscribe((data) => {
      this.destination = data; // Populate destination with fetched data
    });
  }

  onImageSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedImage = target.files[0]; // Get selected image
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.destination.name);
    formData.append('description', this.destination.description);
    formData.append('location', this.destination.location);
    formData.append('price', this.destination.price.toString());
    formData.append('popular', this.destination.popular.toString());

    if (this.selectedImage) {
      formData.append('image', this.selectedImage); // Append image if selected
    }

    this.destinationService.updateDestination(this.destination.id, formData).subscribe(
      () => {
        alert('Destination updated successfully!');
        this.router.navigate(['/destinations']); // Navigate back after successful update
      },
      (error) => {
        console.error('Error updating destination:', error);
      }
    );
  }
}
