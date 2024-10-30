import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CircuitService, Circuit } from '../services/circuit.service'; // Ensure 'Circuit' is imported

@Component({
  selector: 'app-edit-circuit',
  templateUrl: './edit-circuit.component.html',
  styleUrls: ['./edit-circuit.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class EditCircuitComponent implements OnInit {
  circuit: Circuit = {
    name: '',
    description: '',
    location: '',
    rating: 0.0,
    difficulty_level: 1,
  };
  circuitId!: number;

  constructor(
    private circuitService: CircuitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the circuit ID from the route parameters
    this.circuitId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCircuit();
  }

  loadCircuit(): void {
    this.circuitService.getCircuit(this.circuitId).subscribe(
      (circuit) => {
        this.circuit = circuit;
      },
      (error) => {
        console.error('Error loading circuit:', error);
      }
    );
  }

  updateCircuit(): void {
    this.circuitService.updateCircuit(this.circuitId, this.circuit).subscribe(
      () => {
        console.log('Circuit updated successfully!');
        this.router.navigate(['/circuits']); // Navigate back to the circuit list
      },
      (error) => {
        console.error('Error updating circuit:', error);
      }
    );
  }
}
