import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Destination} from '../destination';
import {DestinationService} from '../destination.service';

@Component({
  selector: 'app-destination-details',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './destination-details.component.html',
  styleUrl: './destination-details.component.css'
})
export class DestinationDetailsComponent {
  destination!: Destination;

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.destinationService.getDestination(id).subscribe(
      (data) => {
        this.destination = data;
      },
      (error) => {
        console.error('Error fetching destination details', error);
      }
    );
  }
}
