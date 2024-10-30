// circuit-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CircuitService, Circuit, Review } from '../services/circuit.service';

@Component({
  selector: 'app-circuit-detail',
  templateUrl: './circuit-detail.component.html',
  styleUrls: ['./circuit-detail.component.css'],
})
export class CircuitDetailComponent implements OnInit {
  circuit: Circuit | null = null;
  reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private circuitService: CircuitService
  ) {}

  ngOnInit(): void {
    const circuitId = Number(this.route.snapshot.paramMap.get('id'));
    if (circuitId) {
      this.loadCircuitDetails(circuitId);
    }
  }

  loadCircuitDetails(id: number): void {
    this.circuitService.getCircuit(id).subscribe(
      (data) => {
        this.circuit = data;
      },
      (error) => {
        console.error('Error fetching circuit details:', error);
      }
    );

    this.circuitService.getReviews(id).subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
}
